import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

/**
 * METHOD: POST
 * ENDPOINT: /api/post
 * REQ BODY: title
 * OPT BODY: content
 *
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email || '' } }
      }
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default handle;
