import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot('mongodb://localhost/nest-auth'),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
