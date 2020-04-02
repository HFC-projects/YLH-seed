import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { LoggerService } from './services/logger.service';
import { LocalStrategy } from './services/auth/local.strategy';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';

@Module({
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60m'}
    })],
  providers: [AuthService, LocalStrategy, JwtStrategy, LoggerService],
  exports: [AuthService, LoggerService]
})
export class CoreModule {}
