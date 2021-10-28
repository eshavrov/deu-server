import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { Layout } from '@components/common';

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return <>Content</>;
}

Home.Layout = Layout as any;
