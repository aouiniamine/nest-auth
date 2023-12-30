import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}

    async verify(user: {name: string, email: string}, token: string){
        const url = `${process.env.URL}/user/verify/${token}`
        const {name, email} = user;

        this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification!!',
            template: 'verification',
            context: {
                name, url
            }
        })

    }
}
