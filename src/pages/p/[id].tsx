import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';

interface Props {
  post: PostProps;
}

const Post: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.post.author?.email;

  let title = props.post.title;
  if (!props.post.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props.post.author?.name || 'Unknown author'}</p>
        <ReactMarkdown>{props.post.content}</ReactMarkdown>
        {!props.post.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.post.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && <button onClick={() => deletePost(props.post.id)}>Delete</button>}
      </div>
    </Layout>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1
    },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });
  return {
    props: { post }
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT'
  });
  await Router.push('/');
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  });
  await Router.push('/');
}
