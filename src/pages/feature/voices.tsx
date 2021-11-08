import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { Layout } from '@components/common';
import { VoiceSettings } from '@components/feature/voices';

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return <VoiceSettings />;
}

Home.Layout = Layout as any;
