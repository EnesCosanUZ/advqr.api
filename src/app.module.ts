import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { DatabaseModule } from './database.module';
import { UserModule } from './users/users.module';
import { QrsModule } from './qrs/qrs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ DatabaseModule, UserModule, QrsModule, AuthModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}

