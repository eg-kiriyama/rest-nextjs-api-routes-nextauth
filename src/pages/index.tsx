import Head from 'next/head';
import { Inter } from 'next/font/google';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';
import { FC } from 'react';
import Layout from '../components/Layout';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  feed: PostProps[];
}

const Blog: FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Rest Next.js API</title>
        <meta name="description" content="Next.js with NextAuth and Prisma" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <div>
            <div className="page">
              <h1>Public Feed</h1>
              <main>
                {props.feed.map((post) => (
                  <div key={post.id} className="post">
                    <Post post={post} />
                  </div>
                ))}
              </main>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return {
    props: { feed }
  };
};
