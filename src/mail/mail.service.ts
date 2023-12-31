import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService, private readonly config: ConfigService){}

    async verify(user: User, token: string){
        const url = `${this.config.get('URL')}/user/verify/${token}`
        let [name, email] = [String(user.name), String(user.email)]

        this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification!!',
            template: './verification',
            context: {
                name, url
            }
        })

    }
}
