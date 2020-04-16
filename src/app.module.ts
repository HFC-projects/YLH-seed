import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { config } from './config';
import { TypegooseModule } from 'nestjs-typegoose';


@Module({
  imports: [
    CoreModule,
    UsersModule,
    CommonModule,
    TypegooseModule.forRoot(config.dataAccess.uri, config.dataAccess.options)
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
