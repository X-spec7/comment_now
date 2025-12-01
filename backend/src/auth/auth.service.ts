import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { USER_ROLES, USER_STATUS, PASSWORD, JWT } from '../common/constants/app.constants';
import { AUTH } from '../common/constants/error-messages.constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AUTH.USER_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, PASSWORD.SALT_ROUNDS);

    // Create user with expert role by default
    const user = await this.usersService.create({
      ...userData,
      email,
      password: hashedPassword,
      role: USER_ROLES.EXPERT,
      status: USER_STATUS.PENDING,
    });

    // Generate tokens
    const tokens = await this.generateTokens(user._id, user.email, user.role);
    
    // Update user with refresh token
    await this.usersService.updateRefreshToken(user._id, tokens.refresh_token);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(AUTH.INVALID_CREDENTIALS);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH.INVALID_CREDENTIALS);
    }

    // Check if user is active
    if (user.status !== USER_STATUS.ACTIVE) {
      throw new UnauthorizedException(AUTH.ACCOUNT_NOT_ACTIVE);
    }

    // Generate tokens
    const tokens = await this.generateTokens(user._id, user.email, user.role);
    
    // Update user with refresh token
    await this.usersService.updateRefreshToken(user._id, tokens.refresh_token);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto, adminUser: any) {
    // Only admins can create other admins
    if (adminUser.role !== USER_ROLES.ADMIN) {
      throw new UnauthorizedException(AUTH.ONLY_ADMIN_CAN_CREATE_ADMIN);
    }

    const { email, password, ...userData } = createAdminDto;

    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AUTH.USER_ALREADY_EXISTS);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, PASSWORD.SALT_ROUNDS);

    // Create admin user
    const user = await this.usersService.create({
      ...userData,
      email,
      password: hashedPassword,
      role: USER_ROLES.ADMIN,
      status: USER_STATUS.ACTIVE,
    });

    return {
      user: this.sanitizeUser(user),
      message: 'Admin user created successfully',
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refresh_token || user.refresh_token !== refreshToken) {
      throw new UnauthorizedException(AUTH.INVALID_REFRESH_TOKEN);
    }

    const tokens = await this.generateTokens(user._id, user.email, user.role);
    await this.usersService.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { email, sub: userId, role };
    const refreshPayload = { email, sub: userId, role, refreshToken: '' };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: JWT.ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
        expiresIn: JWT.REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private sanitizeUser(user: any) {
    const { password, refresh_token, ...sanitizedUser } = user.toObject();
    return sanitizedUser;
  }
}
