import Head from 'next/head';
import EmailManagement from '@/components/mail-sender/EmailManagement';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EmailManagementPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Email Management - Project Dashboard</title>
        <meta name="description" content="Email sender and logs management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EmailManagement />
    </ProtectedRoute>
  );
}
