import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { FullAuthenticationStrategy } from './strategies/passport-jwt.strategy';
import { ShopsModule } from 'src/shops/shops.module';
import { ShopsService } from 'src/shops/shops.service';
import { Shop } from 'src/shops/entities/shop.entity';

@Module({
  imports: [
    ShopsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forFeature([User, Shop]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret:process.env.SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES
      },
    }),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    FullAuthenticationStrategy,
    ShopsService
  ],
  exports: [UserService,FullAuthenticationStrategy],
})
export class UserModule {}
