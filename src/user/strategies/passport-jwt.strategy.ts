import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../interfaces/payload.interface";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

const HEADER_AUTHENTICATION_TOKEN_KEY = 'authenticationtoken';
export const FULL_AUTH_GUARD = 'FULL_AUTH_GUARD';

@Injectable()
export class FullAuthenticationStrategy extends PassportStrategy(
    Strategy,
    FULL_AUTH_GUARD
    ) {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader(HEADER_AUTHENTICATION_TOKEN_KEY),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET')
        })
    }

    async validate(payload: Payload) {
        //j'ai recuperer mon user
        const user = await this.userRepository.findOne({ where: { email: payload.email } });
        console.log(user);
        
        if(!user){
            throw new UnauthorizedException();   
        }
        delete user.salt;
        delete user.password;
        return user
    }
}