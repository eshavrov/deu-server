import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';

type TBlogPageProps = {
  blogPosts: BlogPost[];
};

const BlogPage: FC<TBlogPageProps> = ({ blogPosts = [] }) => {
  return (
    <div>
      <h1>BlogPage</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          <Link href={`/${id}`}>{title}</Link>
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

export default BlogPage;