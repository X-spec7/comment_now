import { Controller, Get, Post, Body, Put, UseGuards, Version } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import type { UserDocument } from './users.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResponseBuilder } from '../../common/utils/response-builder.util';
import { UserResponseData } from '../../common/interfaces/api-response.interface';
import { API_VERSION } from '../../common/constants/version.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Version(API_VERSION.V1)
  async getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @Version(API_VERSION.V1)
  async create(@Body() body: Partial<User>): Promise<User> {
    return this.usersService.create(body);
  }

  @Get('me')
  @Version(API_VERSION.V1)
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: UserDocument) {
    const { password, refresh_token, ...sanitizedUser } = user.toObject();
    const userData: UserResponseData = {
      id: sanitizedUser._id,
      email: sanitizedUser.email,
      first_name: sanitizedUser.first_name,
      last_name: sanitizedUser.last_name,
      role: sanitizedUser.role,
      status: sanitizedUser.status,
      title: sanitizedUser.title,
      bio: sanitizedUser.bio,
      address: sanitizedUser.address,
      phone_number: sanitizedUser.phone_number,
      createdAt: sanitizedUser.createdAt,
      updatedAt: sanitizedUser.updatedAt,
    };
    return ResponseBuilder.success(userData, 'Profile retrieved successfully');
  }

  @Put('me')
  @Version(API_VERSION.V1)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: UserDocument,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const updatedUser = await this.usersService.updateProfile(user._id, updateProfileDto);
    const { password, refresh_token, ...sanitizedUser } = updatedUser.toObject();
    const userData: UserResponseData = {
      id: sanitizedUser._id,
      email: sanitizedUser.email,
      first_name: sanitizedUser.first_name,
      last_name: sanitizedUser.last_name,
      role: sanitizedUser.role,
      status: sanitizedUser.status,
      title: sanitizedUser.title,
      bio: sanitizedUser.bio,
      address: sanitizedUser.address,
      phone_number: sanitizedUser.phone_number,
      createdAt: sanitizedUser.createdAt,
      updatedAt: sanitizedUser.updatedAt,
    };
    return ResponseBuilder.updated(userData, 'Profile updated successfully');
  }
}
