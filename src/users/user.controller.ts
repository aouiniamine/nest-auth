import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserRepository } from './user.repository'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from "./user.schema";
import { JwtService } from '@nestjs/jwt';
import { MailService } from "src/mail/mail.service";
import { jwtConstants } from "./constants";

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

    @Get('/user/verify/:token')
    async verify(@Param() params: {token: string}){
        const {token} = params
        const {secret} = jwtConstants
        const {_id} = await this.jwtService.verifyAsync(token, {secret})
        const user = this.userService.verifyUser(_id)
        return user


    }

    @Post('/user/login')
    async login(@Body() user: {email: string, password: string}){
        const {email, password} = user;

        const userFound = await this.userService.findUser({email});
        if(!userFound) return {message: 'user not found'}

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return {message: 'password is incorrect'}

        return userFound
    }
}