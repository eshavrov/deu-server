import { Controller, Get, Render } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get('/')
  @Render('index')
  home() {
    return {};
  }

  @Get('/blog')
  @Render('blog')
  blog() {
    return {};
  }

  @Get('/blog/:id')
  @Render('blog/[id]')
  blogPost() {
    return {};
  }
}
