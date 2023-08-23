import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateQRDto {
    @ApiProperty({ default: 'https://google.com/' })
    @IsNotEmpty()
    qrReal: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}

export class UpdateQRDto extends PartialType(CreateQRDto) {
    @ApiProperty({ default: 'https://google.com/' })
    @IsNotEmpty()
    qrReal: string;

    @ApiProperty()
    @IsOptional()
    userId?: number;
}