import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class CreateUserInput extends PickType(UserModel, ['name', 'email', 'password']) { }

@ObjectType()
export class CreateUserOutput extends OutputDto { }