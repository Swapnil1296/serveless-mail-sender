import PortfolioLanding from '@/components/portfolio/PortfolioLanding';
import Head from 'next/head';
import { siteConfig, getAbsoluteUrl } from '@/lib/siteConfig';

export default function Home() {
  const ogImage = getAbsoluteUrl(siteConfig.ogImage);
  
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <PortfolioLanding />
    </>
  );
}
