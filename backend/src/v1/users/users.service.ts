import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { refresh_token: refreshToken }).exec();
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true }
    ).exec();
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }

  private sanitizeUser(user: any) {
    const { password, refresh_token, ...sanitizedUser } = user.toObject();
    return sanitizedUser;
  }
}
