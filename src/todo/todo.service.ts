import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    console.log(createTodoDto);
    const todo = new Todo();
    todo.todoString = createTodoDto.todoString;
    todo.status = false;
    todo.userId = userId;
    this.todoRepository.save(todo);
    return { message: 'Todo created!' };
  }

  async findAll(id: number) {
    // const value = await this.cacheManager.get(`${id}`);
    // if (value) {
    //   console.log(value);
    // }
    const todos = await this.todoRepository.findBy({ userId: id });
    //await this.cacheManager.set(`${id}`, todos, 5000);
    return todos;
  }

  async findOne(id: number, userId: number) {
    const todo = await this.todoRepository.findOneBy({
      id: id,
      userId: userId,
    });
    if (!todo) {
      return {
        message: 'Todo not found',
      };
    }
    return todo;
  }

  async update(id: number, userId: number, updateTodoDto: UpdateTodoDto) {
    const result = await this.todoRepository.update(
      { id: id, userId: userId },
      {
        status: updateTodoDto.status,
      },
    );

    if (result.affected === 0) {
      return {
        message: 'Todo not found',
      };
    }

    return {
      message: `Todo with id: ${id} updated to ${updateTodoDto.status}`,
    };
  }

  remove(id: number) {
    this.todoRepository.delete(id);
    return {
      message: `Todo with id: ${id} deleted`,
    };
  }
}
