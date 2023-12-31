import { Body, Controller, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from "./user.schema";
import { JwtService } from '@nestjs/jwt';
import { MailService } from "src/mail/mail.service";

@Controller()

export class UserController{
    constructor(private readonly userService: UserRepository,
        private jwtService: JwtService,
        private mailService: MailService){}
    @Post('/user/register')
    async register(@Body() newUser: User){
        const salt = await bcrypt.genSalt()
        newUser.password = await bcrypt.hash(newUser.password, salt) // hash password
        const savedUser = await this.userService.addUser(newUser) // store into db
        
        const {_id} = savedUser; // setup token
        const token = await this.jwtService.signAsync({_id})

        this.mailService.verify(savedUser, token) // send email to verify
        return {
            access_token: token
        }
    }
}