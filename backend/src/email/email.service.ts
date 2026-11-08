import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: Number(this.configService.get<string>('SMTP_PORT')),
      secure: this.configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetLink: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to: email,
        subject: 'UniExam - Reset Your Password',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <div style="max-width: 500px; margin: auto;">
                <h2 style="color: #176b57;">
                  UniExam Password Reset
                </h2>

                <p>
                  You requested to reset your UniExam account password.
                </p>

                <p>
                  Click the button below to create a new password:
                </p>

                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #176b57;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                  "
                >
                  Reset Password
                </a>

                <p>
                  This password reset link expires in 15 minutes.
                </p>

                <p>
                  If you did not request this password reset,
                  you can safely ignore this email.
                </p>

                <hr />

                <p style="font-size: 12px; color: #777;">
                  UniExam - University Exam Preparation Platform
                </p>
              </div>
            </body>
          </html>
        `,
      });
    } catch {
      throw new InternalServerErrorException(
        'Unable to send password reset email.',
      );
    }
  }
}
