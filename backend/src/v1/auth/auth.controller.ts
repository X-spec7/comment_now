import { Controller, Post, Body, Res, UseGuards, HttpCode, HttpStatus, Version } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { COOKIES, JWT, COOKIE_CONFIG, USER_ROLES } from '../../common/constants/app.constants';
import { AUTH } from '../../common/constants/error-messages.constants';
import { ResponseBuilder } from '../../common/utils/response-builder.util';
import { AuthResponseData } from '../../common/interfaces/api-response.interface';
import { API_VERSION } from '../../common/constants/version.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Version(API_VERSION.V1)
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(registerDto);
    
    // Set cookies using constants
    res.cookie(COOKIES.ACCESS_TOKEN, result.access_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.ACCESS_TOKEN_MAX_AGE,
    });
    
    res.cookie(COOKIES.REFRESH_TOKEN, result.refresh_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
    });

    const responseData: AuthResponseData = {
      user: result.user,
      message: 'User registered successfully',
    };

    return ResponseBuilder.created(responseData, 'User registered successfully');
  }

  @Post('login')
  @Version(API_VERSION.V1)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto);
    
    // Set cookies using constants
    res.cookie(COOKIES.ACCESS_TOKEN, result.access_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.ACCESS_TOKEN_MAX_AGE,
    });
    
    res.cookie(COOKIES.REFRESH_TOKEN, result.refresh_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
    });

    const responseData: AuthResponseData = {
      user: result.user,
      message: 'Login successful',
    };

    return ResponseBuilder.success(responseData, 'Login successful');
  }

  @Post('create-admin')
  @Version(API_VERSION.V1)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLES.ADMIN)
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @CurrentUser() user: any) {
    const result = await this.authService.createAdmin(createAdminDto, user);
    return ResponseBuilder.created(result, 'Admin user created successfully');
  }

  @Post('refresh')
  @Version(API_VERSION.V1)
  @UseGuards(JwtRefreshGuard)
  async refresh(@CurrentUser() user: any, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refreshTokens(user._id, user.refresh_token);
    
    // Set new cookies using constants
    res.cookie(COOKIES.ACCESS_TOKEN, tokens.access_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.ACCESS_TOKEN_MAX_AGE,
    });
    
    res.cookie(COOKIES.REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
    });

    return ResponseBuilder.success(null, 'Tokens refreshed successfully');
  }

  @Post('logout')
  @Version(API_VERSION.V1)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: any, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user._id);
    
    // Clear cookies using constants
    res.clearCookie(COOKIES.ACCESS_TOKEN);
    res.clearCookie(COOKIES.REFRESH_TOKEN);

    return ResponseBuilder.success(null, 'Logged out successfully');
  }
}
