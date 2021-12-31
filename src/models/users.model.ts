import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, IsEmail, Length } from 'class-validator'

@InputType('UserModelPrisma', { isAbstract: true })
@ObjectType()
export class UserModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  @IsString()
  name: string

  @Field(type => String)
  @IsEmail()
  email: string

  @Field(type => String)
  @Length(6)
  password: string

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}