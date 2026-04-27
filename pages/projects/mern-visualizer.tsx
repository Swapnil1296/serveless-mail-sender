import React from 'react';
import Head from 'next/head';
import ProtectedRoute from '@/components/ProtectedRoute';
import MernVisualizerApp from '@/components/mern-visualizer/MernVisualizerApp';
import { getAbsoluteUrl } from '@/lib/siteConfig';

export default function MernVisualizerPage() {
  const ogImage = getAbsoluteUrl('/cyberpunk.png');

  return (
    <ProtectedRoute projectSlug="mern-visualizer">
      <>
        <Head>
          <title>MERN Mental Model Visualizer - React, Node, Closure, Workers</title>
          <meta
            name="description"
            content="Visualize React state updates, Node event loop, closures, and web workers with animated diagrams"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/cyberpunk_circle_image.png" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="MERN Mental Model Visualizer" />
          <meta property="og:description" content="Animated visualizations of React state, event loop, closures, workers" />
          <meta property="og:image" content={ogImage} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="MERN Mental Model Visualizer" />
          <meta name="twitter:description" content="Animated visualizations of React state, event loop, closures, workers" />
          <meta name="twitter:image" content={ogImage} />
        </Head>
        <MernVisualizerApp />
      </>
    </ProtectedRoute>
  );
}
