import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import Blog from './interface';

@Controller('blogs')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTodos(): Promise<Blog[]> {
    return await this.appService.getBlogs();
  }

  @Post()
  async createTodo(@Body() blog: Blog): Promise<Blog> {
    return await this.appService.createBlog(blog);
  }

  @Post(':id')
  async getTodo(@Param() id: string): Promise<Blog> {
    return await this.appService.getBlog(id);
  }

  @Delete(':id')
  async deleteTodo(@Param() id: string): Promise<any> {
    return await this.appService.deleteBlog(id);
  }
}
