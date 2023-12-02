import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.todoService.create(
      createTodoDto,
      this.jwtService.decode(token).sub,
    );
  }

  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.todoService.findAll(this.jwtService.decode(token).sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.todoService.findOne(+id, this.jwtService.decode(token).sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() request: Request,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
    return this.todoService.update(
      +id,
      this.jwtService.decode(token).sub,
      updateTodoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
