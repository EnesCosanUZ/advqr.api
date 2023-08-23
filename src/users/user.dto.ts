import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsOptional, Matches } from "class-validator";
import { UserType } from "./users.entity";


export class CreateUserDto {
    @ApiProperty({ default: 'default' })
    @IsIn([UserType.Default, UserType.Moderator, UserType.Admin])
    userType: UserType;

    @ApiProperty({ default: 'johndoe' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ default: 'JohnDoe@123' })
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one special character.'
      })
    password: string;

    @ApiProperty({ default: 'johndoe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'John' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ default: 'Doe' })
    @IsNotEmpty()
    surname: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsOptional()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one special character.'
      })
    password?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    surname?: string;
}