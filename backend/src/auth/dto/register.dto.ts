import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum Stream {
  SOCIAL = 'SOCIAL',
  NATURAL = 'NATURAL',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;

  @IsEnum(Stream)
  stream!: Stream;
}
