import { Module } from '@nestjs/common';

import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
