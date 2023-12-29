import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'

export class NewUser {
    name: String
    email: String
    password: String
}

@Controller()

export class UserController{
    constructor(private readonly userService: UserRepository){}
    @Post('/user/register')
    async register(@Body() newUser: NewUser){
        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt)
        console.log(newUser.password)
        return newUser
    }
}