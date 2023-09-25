import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FULL_AUTH_GUARD } from "../strategies/passport-jwt.strategy";

@Injectable()
export class JwtAuthGuard extends AuthGuard(FULL_AUTH_GUARD) {}