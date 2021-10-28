import { GetServerSideProps } from 'next';
import Link from 'next/link';
import type React from 'react';

import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';

type TBlogProps = {
  post: BlogPost;
};

const Blog: React.FC<TBlogProps> = ({ post = {} }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>Blog {post.title}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TBlogProps> = async (
  ctx,
) => {
  const id = ctx.query?.id || 1;
  console.log({ ctx });

  const post = await fetch(`/api/blog-posts/${id}`);

  return { props: { post } };
};

export default Blog;
