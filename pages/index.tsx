import Head from 'next/head';
import PortfolioLanding from '@/components/PortfolioLanding';

export default function Home() {
  return (
    <>
      <Head>
        <title>Swapnil Landage - Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer specializing in MERN stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PortfolioLanding />
    </>
  );
}
