import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/entities/order.entity';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DATABASE_HOST'),
				username: configService.get('DATABASE_USERNAME'),
				password: configService.get('DATABASE_PASSWORD'),
				database: configService.get('DATABASE_NAME'),
				entities: [UserEntity, OrderEntity],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		UserModule,
		OrderModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
