import PortfolioLanding from '@/components/portfolio/PortfolioLanding';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Swapnil Landage - Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer specializing in MERN stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
      </Head>
      <PortfolioLanding />
    </>
  );
}
