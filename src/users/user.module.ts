import { Module } from "@nestjs/common";
import { User, UserSchema } from "./user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { MailModule } from '../mail/mail.module';
import { MailService } from "src/mail/mail.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({global: true, secret: jwtConstants.secret}),
    MailModule],
    controllers: [UserController],
    providers: [UserRepository, MailService]
})

export class UserModule {}