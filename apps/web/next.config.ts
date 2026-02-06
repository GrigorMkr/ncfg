import type { NextConfig } from "next";
import path from "path";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: isGitHubPages ? '/ncfg' : '',
  assetPrefix: isGitHubPages ? '/ncfg/' : '',
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      { protocol: 'https', hostname: '*.strapiapp.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/commons/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/ru/**' },
      { protocol: 'https', hostname: 'rspp.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'victoriacf.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'iblfrussia.org', pathname: '/**' },
      { protocol: 'https', hostname: 'www.iblfrussia.org', pathname: '/**' },
      { protocol: 'http', hostname: 'www.iblfrussia.org', pathname: '/**' },
      { protocol: 'https', hostname: '*.fa.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'static.tildacdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'thb.tildacdn.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.selcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'tadviser.com', pathname: '/**' },
      { protocol: 'https', hostname: 'foxford.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'www.foxford.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'infourok.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'www.infourok.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'www.yaklass.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.infourok.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'domashniyochag.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'monotown.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'hcdf.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'new.hcdf.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'technograd.moscow', pathname: '/**' },
      { protocol: 'https', hostname: 'www.novochag.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'novochag.ru', pathname: '/**' },
      { protocol: 'https', hostname: '9ca3ea16-1f21-443c-9080-3f8adb4bd954.selcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'xn----dtbhaacat8bfloi8h.xn--p1ai', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.rgs.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'www-data.rgs.ru', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
