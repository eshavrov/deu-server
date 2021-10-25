import { Controller, Get, Param, Render } from '@nestjs/common';
import { map, toArray } from 'rxjs';

import { PagesService } from './pages.service';

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
  public blog() {
    return this.pagesService.getBlogPosts().pipe(
      toArray(),
      map((blogPosts) => ({ blogPosts })),
    );
  }

  @Get('/blog/:id')
  @Render('blog/[id]')
  public blogPost(@Param('id') id: string) {
    return {};
  }
}
