import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id;
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true }
    });
    res.json(post);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default handle;
