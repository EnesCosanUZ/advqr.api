import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class BcryptService {
    async encryptPassword(password: string): Promise<string> {
        const salt = await genSalt();
        return hash(password, salt);
    }
    
    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}
