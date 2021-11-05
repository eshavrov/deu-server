import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { Layout } from '@components/common';
import WordTraining from '@components/feature/wordTraining';

import React from 'react';

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return <WordTraining text="Учите языки потому что это развивает мышление" />;
}

Home.Layout = Layout as any;
