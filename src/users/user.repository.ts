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

    
}