import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'

export class NewUser {
    name: String
    email: String
    password: String
}

@Controller()

export class UserController{
    constructor(private readonly userService: UserRepository){}
    @Post('/user/register')
    register(@Body() newUser: NewUser){
        console.log(newUser)
        
        return newUser
    }
}