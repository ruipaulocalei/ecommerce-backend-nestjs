import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthGuard],
  imports: [UsersModule]
})
export class AuthModule { }
