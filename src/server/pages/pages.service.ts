import { Injectable, NotFoundException } from '@nestjs/common';
import { from, of, toArray } from 'rxjs';

const BLOG_POSTS = [
  { title: 'Post 1', id: 1 },
  { title: 'Post 2', id: 2 },
  { title: 'Post 3', id: 3 },
];

@Injectable()
export class PagesService {
  getBlogPosts() {
    return from(BLOG_POSTS).pipe(toArray());
  }

  getBlogPost(postId: number) {
    const blogPost = BLOG_POSTS.find(({ id }) => id === postId);

    if (!blogPost) {
      throw new NotFoundException();
    }

    return of(blogPost);
  }
}
