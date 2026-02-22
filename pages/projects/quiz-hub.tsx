import Head from 'next/head';
import InterviewHub from '@/components/interview-platform/InterviewHub';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function InterviewHubPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');

  return (
    <ProtectedRoute>
      <Head>
        <title>Interview Prep Platform - Dashboard</title>
        <meta name="description" content="Adaptive MERN interview preparation with quizzes, analytics, and practice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
        <meta property="og:title" content="Interview Prep Platform" />
        <meta property="og:image" content={ogImage} />
      </Head>
      <InterviewHub />
    </ProtectedRoute>
  );
}
