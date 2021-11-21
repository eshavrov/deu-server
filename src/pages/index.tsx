import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { Layout } from '@components/common';
import BoxItem from '@components/ui/BoxItem';
import Grid from '@components/ui/Grid';

// const mock = {
//   title: 'Название учебного заведения',
//   description: 'Короткое описание учебного заведения',
// };

export async function getStaticProps({}: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  // const { title, description } = mock;

  return (
    <>
      {/* <Header title={title} description={description} /> */}
      <Grid>
        <BoxItem slug="/feature/memorize">Заучивание слов</BoxItem>
        <BoxItem slug="/feature/anagramma">Анаграмма</BoxItem>
        <BoxItem slug="/feature/test2">Правильный порядок слов</BoxItem>
      </Grid>
    </>
  );
}

Home.Layout = Layout as any;
