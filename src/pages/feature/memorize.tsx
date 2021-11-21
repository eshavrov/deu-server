import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';

import Layout from '@components/common/Layout/Module';
import Memorize from '@components/feature/memorize';

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return <Memorize />;
}

Home.Layout = Layout as any;
