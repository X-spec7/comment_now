import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ 
    type: String, 
    default: () => uuidv4(),
    unique: true 
  })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'expert'] })
  role: 'admin' | 'expert';

  @Prop({ required: true, enum: ['active', 'inactive', 'pending'] })
  status: 'active' | 'inactive' | 'pending';

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  title?: string;

  @Prop()
  bio?: string;

  @Prop()
  address?: string;

  @Prop()
  phone_number?: string;

  @Prop()
  refresh_token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
