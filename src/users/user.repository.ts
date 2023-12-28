import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()

export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findUser(filterQuery: FilterQuery<User>): Promise<User>{
        return this.userModel.findOne(filterQuery);
    }

    async addUser(user: User): Promise<User>{
        const newUser = new this.userModel(user);
        return newUser.save();
    }
}