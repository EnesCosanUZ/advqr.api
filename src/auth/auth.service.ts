import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { QrsService } from 'src/qrs/qrs.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/users/users.entity';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async generateAccessToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.id,
            role: user.userType
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async signUp(username: string, password: string, email: string, name: string, surname: string) {

        const user = {
            username,
            password,
            email,
            name,
            surname,
            userType: UserType.Default
        }

        return this.userService.insertUser(user);

    }

    async signIn(username: string, pass: string) {
        const user = await this.userService.getUserByUsername(username);

        if(user?.password !== pass) throw new UnauthorizedException();

        const { password, ...result } = user;

        return this.generateAccessToken(result);
        
    }

}
