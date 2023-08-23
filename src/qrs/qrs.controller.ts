import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QR } from './qrs.entity';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQRDto, UpdateQRDto } from './qrs.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('qrs')
@ApiTags('QRs')
export class QrsController {
    constructor(
        private readonly qrService: QrsService
    ) {}

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Get()
    @ApiOperation({ summary: 'Gets All QR with Users' })
    @ApiOkResponse({ description: 'QRs with User' })
    getAllQRs(): Promise<QR[]> {
        return this.qrService.getAllQrs();
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Post()
    @ApiOperation({ summary: 'Create An QR for User' })
    @ApiBody({ type: CreateQRDto })
    @UsePipes(new ValidationPipe({ transform: true }))
    createQr(@Body() createQRDto: CreateQRDto): Promise<QR> {
        return this.qrService.insertQr(createQRDto)
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Get(':id')
    @ApiOperation({ summary: 'Get QR by ID' })
    getQrById(@Param('id') id: number): Promise<QR> {
        return this.qrService.getQrById(id);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Patch(':id')
    @ApiOperation({ summary: 'QR' })
    editQr(@Param('id') id: number, @Body() updateQRDto: UpdateQRDto): Promise<QR> {
        return this.qrService.updateQr(id, updateQRDto);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Delete(':id')
    @ApiOperation({ summary: 'Siliyor işte uzatmaya gerek yok' })
    deleteQr(@Param('id') id: number) {
        return this.qrService.deleteQr(id);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Get('/user/:UserId')
    @ApiOperation({ summary: 'Get QR by User ID' })
    getQrsByUserId(@Param('UserId') UserId: number): Promise<QR[]> {
        return this.qrService.getQrsByUser(UserId);
    }    
}
