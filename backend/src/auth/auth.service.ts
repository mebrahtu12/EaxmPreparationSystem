import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { ForgotPasswordDto } from './dto/forgotPassword';
import { ResetPasswordDto } from './dto/reset-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { username: dto.username }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        stream: dto.stream,
      },
      select: {
        id: true,
        username: true,
        email: true,
        stream: true,
        createdAt: true,
      },
    });

    return {
      message: 'Account created successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        stream: user.stream,
      },
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const genericMessage =
      'If an account exists with this email, a reset link will be sent.';

    // 1. Find the user by email.
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // 2. Return a generic response if the account doesn't exist.
    if (!user) {
      return { message: genericMessage };
    }

    // 3. Generate a secure random token.
    const resetToken = randomBytes(32).toString('hex');

    // 4. Hash the token before storing it.
    const tokenHash = createHash('sha256').update(resetToken).digest('hex');

    // 5. Set token expiration to 15 minutes.
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 6. Delete previous tokens and save the new token.
    await this.prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });
      await tx.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt,
        },
      });
    });

    // 7. Get the frontend URL.
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!frontendUrl) {
      throw new Error('FRONTEND_URL is missing from environment variables.');
    }

    // 8. Create the password reset link.
    const resetLink = `${frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;

    // 9. Send the email.
    try {
      await this.emailService.sendPasswordResetEmail(user.email, resetLink);
    } catch {
      // Remove the token if email delivery fails.
      await this.prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      console.error('Password reset email delivery failed.');
    }

    // 10. Return a generic response.
    return { message: genericMessage };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Hash the token received from the email.
    const tokenHash = createHash('sha256').update(dto.token).digest('hex');

    // Find the matching token in PostgreSQL.
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
    });

    // Reject invalid or already-used tokens.
    if (!resetToken) {
      throw new BadRequestException('Invalid or expired password reset link.');
    }

    // Check whether the token has expired.
    if (resetToken.expiresAt.getTime() < Date.now()) {
      await this.prisma.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });

      throw new BadRequestException(
        'Your password reset link has expired. Request a new one.',
      );
    }

    // Hash the new password.
    const hashedPassword = await bcrypt.hash(dto.newPassword, 12);

    // Update the password and delete the token together.
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      await tx.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });
    });

    return {
      message: 'Password reset successfully. You can now log in.',
    };
  }
}
