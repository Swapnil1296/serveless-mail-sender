import Head from 'next/head';
import EmailManagement from '@/components/mail-sender/EmailManagement';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function EmailManagementPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');
  
  return (
    <ProtectedRoute>
      <Head>
        <title>Email Management - Project Dashboard</title>
        <meta name="description" content="Email sender and logs management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Email Management - Project Dashboard" />
        <meta property="og:description" content="Email sender and logs management" />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Email Management - Project Dashboard" />
        <meta name="twitter:description" content="Email sender and logs management" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <EmailManagement />
    </ProtectedRoute>
  );
}
