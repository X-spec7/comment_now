import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { PASSWORD, USER_ROLES } from '../../common/constants/app.constants';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(PASSWORD.MIN_LENGTH)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEnum([USER_ROLES.EXPERT])
  role?: 'expert';
}
