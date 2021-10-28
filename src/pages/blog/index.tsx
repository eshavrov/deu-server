import type React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Layout } from '@components/common';

import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';

type TBlogPageProps = {
  blogPosts: BlogPost[];
};

const BlogPage = ({ blogPosts = [] }: TBlogPageProps) => {
  return (
    <div>
      <h1>BlogPage</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          <Link href={`/blog/${id}`}>{title}</Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TBlogPageProps> =
  async () => {
    const blogPosts = await fetch('/api/blog-posts');

    return { props: { blogPosts } };
  };

BlogPage.Layout = Layout as any;

export default BlogPage;
