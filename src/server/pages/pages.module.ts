import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';

import { NODE_ENV } from 'src/shared/constants/env';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: NODE_ENV === 'development' }), {
      viewsDir: null,
    }),
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
