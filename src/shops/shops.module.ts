import { Module, forwardRef } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Shop } from './entities/shop.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FullAuthenticationStrategy } from 'src/user/strategies/passport-jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forFeature([Shop, User]),
    
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
  controllers: [ShopsController],
  providers: [ShopsService, UserService, FullAuthenticationStrategy],
  exports: [ShopsService]
})
export class ShopsModule {}
