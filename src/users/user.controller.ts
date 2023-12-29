import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { User } from "./user.schema";

@Controller()

export class UserController{
    constructor(private readonly userService: UserRepository){}
    @Post('/user/register')
    async register(@Body() newUser: User){
        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt)
        
        return this.userService.addUser(newUser)
    }
}