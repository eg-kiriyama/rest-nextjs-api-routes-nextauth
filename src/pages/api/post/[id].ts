import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

/**
 * METHOD: DELETE
 * ENDPOINT: /api/post/:id
 *
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id;

  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'DELETE') {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: Number(postId) }
      });
      res.json(post);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
};

export default handle;
