import { Module } from "@nestjs/common";
import { User, UserSchema } from "./user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserRepository]
})

export class UserModule {}