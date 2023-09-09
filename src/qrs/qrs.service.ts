import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as QRCode from 'qrcode';

import { QR } from './qrs.entity';
import { CreateQRDto, UpdateQRDto } from './qrs.dto';
import { User } from '../users/users.entity';
import { UserService } from '../users/users.service';

@Injectable()
export class QrsService {

    constructor(
        @InjectRepository(QR)
        private readonly qrRepository: Repository<QR>,
        
        private readonly userService: UserService
    ) {}

    private async generateQR(url) {
        return await QRCode.toString(url, { type: 'svg' }).then((modified) => {
            const qrPath = modified.substring(
                modified.match('<path').index,
                modified.match('</svg>').index
            );
            return qrPath;
        })
    }

    getAllQrs(): Promise<QR[]> {
        return this.qrRepository.find({relations: ['user']});
    }

    async insertQr(createQRDto: CreateQRDto): Promise<QR> {

        const qrReal = createQRDto.qrReal;
        const qrPath: string = await this.generateQR(createQRDto.qrReal);
        const createdAt: Date = new Date();
        const updatedAt: Date = new Date();
        const qrOpened: number = 0;
        const user: User = await this.userService.getUser(createQRDto.userId);

        const qr = this.qrRepository.create({ qrReal, qrPath, qrOpened, createdAt, updatedAt, user });

        return this.qrRepository.save(qr);
    }

    async getQrById(id: number): Promise<QR> {

        const qr = await this.qrRepository.findOne({ where: { id }, relations: ['user'] });

        if(!qr) throw new NotFoundException('There is no qrcode with this id!')

        return qr;

    }

    async getQrsByUser(userId: number): Promise<QR[]> {
        const user = await this.userService.getUser(userId);
        
        const qrList: QR[] = [];

        for(const qr of user.qrs) {
            qrList.push(qr);
        }

        if(qrList.length == 0) throw new NotFoundException('There is no qr for this user!')
        
        return qrList;
    }

    async updateQr(id: number, updateQRDto: UpdateQRDto): Promise<QR> {

        const qr = await this.getQrById(id);

        const qrPath = await this.generateQR(updateQRDto.qrReal);

        const updatedQr = this.qrRepository.create({ qrReal: updateQRDto.qrReal, qrPath, qrOpened: 0, createdAt: qr.createdAt, updatedAt: new Date() });

        Object.assign(qr, updatedQr);

        return this.qrRepository.save(qr);

    }

    async deleteQr(id: number): Promise<string> {
        const qr = await this.getQrById(id);

        this.qrRepository.delete(qr);

        return `${qr} has been deleted!`;
    }
}
