import Head from 'next/head';
import ResumeCreator from '@/components/resume-creator/ResumeCreator';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function ResumeCreatorPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');

  return (
    <ProtectedRoute projectSlug="resume-creator">
      <Head>
        <title>ATS Resume Creator - Project Dashboard</title>
        <meta
          name="description"
          content="Create an ATS-friendly resume from 5 job descriptions using AI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="ATS Resume Creator - Project Dashboard" />
        <meta property="og:description" content="Create an ATS-friendly resume from 5 job descriptions using AI" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ATS Resume Creator - Project Dashboard" />
        <meta name="twitter:description" content="Create an ATS-friendly resume from 5 job descriptions using AI" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <ResumeCreator />
    </ProtectedRoute>
  );
}
