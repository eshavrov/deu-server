import type React from 'react';
import NextHead from 'next/head';
import { DefaultSeo } from 'next-seo';
import { GoogleFonts } from 'next-google-fonts';

import config from '@config/seo.json';

const Head: React.FC = () => {
  return (
    <>
      <DefaultSeo {...config} />
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  );
};

export default Head;
