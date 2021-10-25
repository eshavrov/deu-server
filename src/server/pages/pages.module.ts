import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [RenderModule.forRootAsync(Next({ dev: true }), { viewsDir: null })],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
