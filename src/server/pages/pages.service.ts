import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

const BLOG_POSTS = [
  { title: 'Post 1', id: 1 },
  { title: 'Post 2', id: 2 },
  { title: 'Post 3', id: 3 },
];

@Injectable()
export class PagesService {
  getBlogPosts() {
    return from(BLOG_POSTS);
  }
}
