import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, IsNumber, Length } from 'class-validator'

@InputType('ProductModelPrisma', { isAbstract: true })
@ObjectType()
export class ProductModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  @IsString()
  name: string

  @Field(type => Number)
  @IsNumber()
  price: number

  @Field(type => String)
  image: string

  @Field(type => String, { nullable: true })
  @Length(10)
  description?: string

  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}