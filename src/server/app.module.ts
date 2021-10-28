import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { NODE_ENV } from 'src/shared/constants/env';

import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
      viewsDir: null,
    }),
    ConfigModule.forRoot({
      envFilePath: `.${NODE_ENV}.env`,
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PagesModule,
  ],
})
export class AppModule {}
