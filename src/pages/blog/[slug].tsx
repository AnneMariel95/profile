import fs from 'fs';
import matter from 'gray-matter';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import path from 'path';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import type {IBlogMetadata} from '../../models/blog';
import BlogContent from '../../modules/blog/BlogContent';
import BlogHeader from '../../modules/blog/BlogHeader';
import BlogLayout from '../../modules/blog/BlogLayout';
import {client} from '../../utils/contentful.utils';
import {blurImage} from '../../utils/image-blur.utils';
import {getBlogsMetadata} from '../../utils/mdxUtils';
import {BLOGS_PATH} from '../../utils/mdxUtils';

export default function BlogPage({
  source,
  frontMatter: blog,
  img,
  svg,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!blog) {
    return (
      <div className="h-[80vh] w-full bg-transparent text-center pt-10">
        <h2>Please wait</h2>
        <h3>Using magic to load content...</h3>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="keywords" content={blog.keywords?.join(',')} />
        <meta
          property="og:url"
          content={`https://annemariel.com/blog/${blog.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.bannerId} />

        <meta name="description" content={blog.description} />

        <meta name="twitter:image" content={blog.bannerId} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:title" content={blog.title} />

        <link rel="icon" href="/favicon.ico" />

        {/* For PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo.png"></link>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "${blog.title}",
            "image": "${blog.bannerId}",
            "editor": "Anne Mariel",
            "author": "Anne Mariel",
            "genre": "${blog.tags?.join(' ')}",
            "keywords": "${blog.keywords?.join(' ')}",
            "url": "https://annemariel.com/blog/${blog.slug}",
            "dateCreated": "${blog.date}",
            "dateModified": "${blog.dateUpdated}",
            "description": "${blog.description}",
            "articleBody": "${blog.title}. ${blog.description}"
            }`,
          }}
        ></script>

        <link
          rel="canonical"
          href={`https://annemariel.com/blog/${blog.slug}`}
        />
      </Head>

      <main role="main">
        <BlogLayout>
          <BlogHeader blog={blog} img={img} svg={svg} />
          <BlogContent source={source} />
          <br />
        </BlogLayout>
      </main>
    </>
  );
}

export const getStaticProps = async ({
  params,
  locale,
}: GetStaticPropsContext) => {
  const postFilePath = path.join(BLOGS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {content, data} = matter(source);

  const asset = await client.getAsset(data.bannerId);

  const bannerUrl = `https:${asset.fields.file.url}`;
  const {img, svg} = await blurImage(bannerUrl);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkMdxCodeMeta],
      rehypePlugins: [],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        slug: params?.slug,
        bannerId: bannerUrl,
      } as IBlogMetadata,
      img,
      svg,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getBlogsMetadata()).map(meta => {
    return {
      params: {
        slug: meta.slug,
      },
    };
  });

  return {
    paths,

    fallback: true,
  };
};
