import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {TodoModule} from "./todo/todo.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.local.env']
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService)=>({uri: configService.get('MONGO_URI')})
      }),
      UserModule, AuthModule, TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
