import { Module } from '@nestjs/common';
import { QrsController } from './qrs.controller';
import { QrsService } from './qrs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QR } from './qrs.entity';
import { UserModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([QR]), UserModule],
    providers: [QrsService],
    controllers: [QrsController],
    exports: [QrsService]
})
export class QrsModule {}
