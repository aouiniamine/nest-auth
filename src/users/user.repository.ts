import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()

export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findUser(filterQuery: FilterQuery<User>): Promise<UserDocument>{
        return this.userModel.findOne(filterQuery);
    }

    async addUser(user: User): Promise<UserDocument>{
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async verifyUser(user: UserDocument): Promise<UserDocument>{
        const {_id} = user
        const verifiedUser = this.userModel.findByIdAndUpdate(_id, {isVerified: true})
        return verifiedUser;
    }
}