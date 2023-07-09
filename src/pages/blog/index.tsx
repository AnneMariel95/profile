import {useState} from 'react';
import type {GetStaticPropsContext, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import {commonMetaTags} from '../../frontend-utils/meta-tags';
import type {IBlogMetadata} from '../../models/blog';
import BlogCard from '../../modules/blog/BlogCard';
import {client} from '../../utils/contentful.utils';
import {getBlogsMetadata} from '../../utils/mdxUtils';

export default function Blog({
  blogs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filtered, setFiltered] = useState<IBlogMetadata[]>(blogs);

  return (
    <>
      <Head>
        <title>My Blogs Listing Page | Anne Mariel</title>
        {commonMetaTags('Blogs Page', '/blog')}
      </Head>

      <main className="flex items-center flex-col pt-12 mb-8">
        <h1>My Blogs</h1>

        {filtered.length > 0 ? (
          filtered.map(blog => {
            return <BlogCard key={blog.slug} blog={blog} />;
          })
        ) : (
          <section className="flex flex-col items-center">
            <h2>Empty result👎</h2>
            <h3>Try a different combination</h3>
          </section>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async ({locale}: GetStaticPropsContext) => {
  const blogs = (await getBlogsMetadata()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  for (let blog of blogs) {
    const asset = await client.getAsset(blog.bannerId);

    const bannerUrl = `https:${asset.fields.file.url}`;
    blog.bannerId = bannerUrl;
  }

  return {
    props: {
      blogs: blogs as IBlogMetadata[],
    },
  };
};
