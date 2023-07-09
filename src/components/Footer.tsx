import NextLink from './basic/NextLink';

export default function Footer() {
  return (
    <footer className="w-full relative h-48 bg-[#966767] text-white flex justify-center overflow-hidden md:h-32">
      <div
        className="flex items-center flex-col-reverse justify-center max-w-6xl w-full text-center
      md:flex-row md:justify-around md:text-right"
      >
        <div className="m-1">
          <NextLink
            href="/sitemap.xml"
            aria-label="Sitemap"
            className="mr-4 text-lg"
          >
            Sitemap
          </NextLink>
          <NextLink
            href="/rss.xml"
            aria-label="Rss Feed"
            rel="noreferrer"
            className="text-lg"
          >
            Rss Feed
          </NextLink>
          <p>All rights Reserved</p>
          <p>© Anne Mariel {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
