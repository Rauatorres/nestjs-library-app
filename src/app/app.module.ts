import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
