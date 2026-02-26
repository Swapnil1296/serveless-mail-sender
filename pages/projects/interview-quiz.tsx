import Head from 'next/head';
import InterviewQuizRunner from '../../components/interview-platform/InterviewQuizRunner';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function InterviewQuizPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');

  return (
    <ProtectedRoute projectSlug="interview-quiz">
      <Head>
        <title>Quiz - Interview Prep Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
        <meta property="og:image" content={ogImage} />
      </Head>
      <InterviewQuizRunner />
    </ProtectedRoute>
  );
}
