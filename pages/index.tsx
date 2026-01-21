import Head from 'next/head';
import BulkEmailSender from '@/components/BulkEmailSender';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bulk Email Sender - Next.js Serverless</title>
        <meta name="description" content="Send bulk emails with Next.js serverless functions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BulkEmailSender />
    </>
  );
}
