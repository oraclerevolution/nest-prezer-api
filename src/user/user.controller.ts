import { Body, Controller, Post } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserAuth } from './enums/user-type.enum';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService 
    ){}
    @Post()
    register(
        @Body() userData: UserSubscribeDto
    ): Promise<User>{
        return this.userService.register(userData)
    }

    @Post('login')
    login(
        @Body() credentials: UserLoginDto
    ): Promise<UserAuth>{
        return this.userService.login(credentials)
    }
}
