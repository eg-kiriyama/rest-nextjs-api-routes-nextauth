import Router from 'next/router';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    <div className="my-2" onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
        <small className="dark:text-gray-100">By {authorName}</small>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </p>
      </a>
    </div>
  );
};

export default Post;
