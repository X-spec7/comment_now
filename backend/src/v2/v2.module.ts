import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
// Import v2 modules when they are created
// import { AuthV2Module } from './auth/auth.module';
// import { UsersV2Module } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/expert_platform'),
    HealthModule,
    // Add v2 modules here when they are created
  ],
})
export class V2Module {}
