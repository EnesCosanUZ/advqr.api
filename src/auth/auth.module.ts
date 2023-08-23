import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { QrsModule } from 'src/qrs/qrs.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { QrsService } from 'src/qrs/qrs.service';

@Module({
    imports: [UserModule, JwtModule.register({
        secret: 'somesecretthings'
    })],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
