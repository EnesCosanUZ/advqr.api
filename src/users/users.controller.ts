import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { UserService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "src/auth/role.guard";
import { Role } from "src/auth/role.decorator";


@Controller('users')
@ApiTags('Users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin')
    @Get()
    @ApiOperation({ summary: "Gets all users" })
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Post()
    @ApiBody({ type: CreateUserDto })
    @ApiOperation({ summary: "Create user" })
    @ApiCreatedResponse({ description: "User Created!" })
    @ApiBadRequestResponse({ description: "Error While Creating User." })
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.insertUser(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.getUser(id);
    }
    
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Patch(':id')
    @ApiBody({ type: UpdateUserDto })
    @ApiOperation({ description: "Update an user with ID" })
    @ApiOkResponse({ description: "User Updated!" })
    @ApiBadRequestResponse({ description: "User Not Found." })
    editUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Role('admin', 'moderator')
    @Delete(':id')
    deleteUser(@Param('id') id:number): Promise<string> {
        return this.userService.deleteUser(id);
    }
}