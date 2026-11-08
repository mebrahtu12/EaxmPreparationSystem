import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(5, {
    message: 'Password must be at least 5 characters long.',
  })
  newPassword: string;
}
