import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    @ApiBody({ type: SignUpDTO })
    signUp(@Body() signUpDto: SignUpDTO) {
        return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.email, signUpDto.name, signUpDto.surname);
    }

    @Post('signin')
    @ApiBody({ type: SignInDTO })
    singIn(@Body() signInDto: SignInDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

}
