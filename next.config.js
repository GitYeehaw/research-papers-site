/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to a GitHub Pages subpath (e.g., username.github.io/repo-name),
  // uncomment and set this:
  basePath: '/research-papers-site',
};

module.exports = nextConfig;
