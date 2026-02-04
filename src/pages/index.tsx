import React from 'react';
import Head from 'next/head';
import Kanban from '../components/Kanban';

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-white">
      <Head>
        <title>OpenClaw Project Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-cyber-cyan">
          OpenClaw Project Manager
        </h1>
        
        <Kanban />
      </main>
    </div>
  );
}