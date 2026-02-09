import Head from 'next/head';
import NaukariScraper from '@/components/naukari-scraper/NaukariScraper';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function NaukariScraperPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');

  return (
    <ProtectedRoute>
      <Head>
        <title>Naukri Scraper - Project Dashboard</title>
        <meta name="description" content="Automated Naukri.com Job Application System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Naukri Scraper - Project Dashboard" />
        <meta property="og:description" content="Automated Naukri.com Job Application System" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naukri Scraper - Project Dashboard" />
        <meta name="twitter:description" content="Automated Naukri.com Job Application System" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <NaukariScraper />
    </ProtectedRoute>
  );
}
