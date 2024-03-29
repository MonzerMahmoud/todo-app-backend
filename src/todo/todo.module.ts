import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Todo]),
    CacheModule.register(),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
