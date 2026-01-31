// Site configuration for meta tags and SEO
export const siteConfig = {
  name: 'Swapnil Landage',
  title: 'Swapnil Landage - Full Stack Developer',
  description: 'Full Stack Developer specializing in MERN stack',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://swapnillandage.in',
  ogImage: '/cyberpunk.png',
  links: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
};

export function getAbsoluteUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, use the configured site URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}/${cleanPath}`;
  }
  
  // In development, use localhost
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${cleanPath}`;
  }
  
  // Fallback for server-side rendering
  return `/${cleanPath}`;
}
