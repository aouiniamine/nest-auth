import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({type: String})
    name = String;
    
    @Prop({type: String})
    email = String;
    
    @Prop({type: String})
    password = String;
    
    @Prop({type: Boolean})
    isVerified = Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);