import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const DynamicMeta = () => {
    const router = useRouter();

    // Route mapping configuration
    const getRouteMeta = (pathname: string) => {
        if (pathname.startsWith('/projects/interview-prep')) {
            return {
                favicon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>`,
                description: "Ace your technical interviews with our comprehensive preparation guide. Practice questions, time complexity charts, and more."
            };
        }
        if (pathname.startsWith('/projects/email-sender')) {
            return {
                favicon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📧</text></svg>`,
                description: "Efficiently manage and send emails with our serverless email application. Track logs and manage templates."
            };
        }

        // Default
        return {
            favicon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>`,
            description: "Project Hub - Your central space for managing projects like Interview Prep and Email Sender."
        };
    };

    const { favicon, description } = getRouteMeta(router.pathname);

    return (
        <Head>
            <link rel="icon" type="image/svg+xml" href={favicon} />
            <meta name="description" content={description} />
        </Head>
    );
};

export default DynamicMeta;
