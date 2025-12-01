import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { PASSWORD } from '../../../common/constants/app.constants';

export class CreateAdminDto {
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
}
