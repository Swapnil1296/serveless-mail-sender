import React from 'react'
import Head from 'next/head';
import { PrepLandingPage } from '@/components/intervew-prep/PrepLandingPage';
import { getAbsoluteUrl } from '@/lib/siteConfig';

const InterveiPrep = () => {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');
  
  return (
    <>
      <Head>
        <title>Interview Preparation - Technical Questions</title>
        <meta name="description" content="Master your technical interviews with comprehensive answers and examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/cyberpunk_circle_image.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Interview Preparation - Technical Questions" />
        <meta property="og:description" content="Master your technical interviews with comprehensive answers and examples" />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interview Preparation - Technical Questions" />
        <meta name="twitter:description" content="Master your technical interviews with comprehensive answers and examples" />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <PrepLandingPage />
    </>
  )
}

export default InterveiPrep
