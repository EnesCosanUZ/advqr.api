import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class SignUpDTO {

    @ApiProperty({ default: "johndoe" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ default: "Johndoe@123" })
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

export class SignInDTO {
    @ApiProperty({ default: "johndoe" })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ default: "Johndoe@123" })
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one special character.'
      })
    password: string;
}