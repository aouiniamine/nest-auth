import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from "./user.schema";
import { JwtService } from '@nestjs/jwt';

@Controller()

export class UserController{
    constructor(private readonly userService: UserRepository, private jwtService: JwtService){}
    @Post('/user/register')
    async register(@Body() newUser: User){
        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt)
        const savedUser = await this.userService.addUser(newUser)
        const {_id, isVerified} = savedUser;
        const payload = {_id, isVerified}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}