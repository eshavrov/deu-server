import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  UseInterceptors,
} from '@nestjs/common';

import { PagesService } from './pages.service';
import { ParamsInterceptor } from '../params.interceptor';

@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('/')
  @Render('index')
  public home() {
    return {};
  }

  @Get('/blog')
  @Render('blog')
  @UseInterceptors(ParamsInterceptor)
  public blog() {
    return {};
  }

  @Get('/blog/:id')
  @Render('blog/[id]')
  public blogPost(@Param('id') id: string) {
    return { id };
  }

  @Get('/api/blog-posts')
  public listBlogPosts() {
    return this.pagesService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.pagesService.getBlogPost(id);
  }
}
