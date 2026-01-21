import Head from 'next/head';
import EmailLogsViewer from '@/components/EmailLogsViewer';

export default function LogsPage() {
  return (
    <>
      <Head>
        <title>Email Logs - Bulk Email Sender</title>
        <meta name="description" content="View and manage email logs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <EmailLogsViewer />
    </>
  );
}
