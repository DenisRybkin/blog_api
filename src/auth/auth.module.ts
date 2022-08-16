import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtLifeExpectancyKeys } from '../constants/jwtKeys';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {expiresIn: JwtLifeExpectancyKeys.ACCESS}
    })
  ],
  exports: [AuthService,JwtModule]
})
export class AuthModule {}
