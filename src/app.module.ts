import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import * as Joi from '@hapi/joi';


const CustomConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'automation')
      .default('development'),
    PORT: Joi.number().default(3000),
  }),
  expandVariables: true
});

@Module({
  imports: [CoreModule, UsersModule, CustomConfigModule, CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
