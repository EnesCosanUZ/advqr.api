import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    insertUser(user: CreateUserDto): Promise<User> {
        if(!user) return null;

        return this.userRepository.save(user);
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['qrs']}); // QR kodları ile birlikte getir

        if(!user) throw new NotFoundException("User Not Found!");

        return user;
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username }})
        
        if(!user) throw new NotFoundException("User Not Found!");

        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUser(id);

        Object.assign(user, updateUserDto);

        return this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id } })

        this.userRepository.delete(user);

        return `${user.username} has been deleted!`;
    }
}