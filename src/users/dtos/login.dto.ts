import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class LoginInput extends PickType(UserModel, ['email', 'password']) { }

@ObjectType()
export class LoginOutput extends OutputDto {
  @Field(() => String, { nullable: true })
  token?: string
}