import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

export class RefreshDto {
  @IsString()
  userId: string;

  @IsString()
  refreshToken: string;
}
