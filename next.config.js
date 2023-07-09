const config = {
  reactStrictMode: true,
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'md', 'mdx'],
  compress: true,
  images: {
    domains: [
      'i.imgur.com',
      'media2.giphy.com',
      'images.ctfassets.net',
      'openseauserdata.com',
      'lh3.googleusercontent.com',
      'live.staticflickr.com',
    ],
    imageSizes: [16, 32, 48, 64],
    deviceSizes: [
      96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
    ],
  },
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  ...config,
});
