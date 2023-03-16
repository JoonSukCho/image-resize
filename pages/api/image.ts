// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { body } = req;
    const sharpRes = await sharp(body.image);
    console.log(sharpRes);

    return res.status(200).json({ name: 'John Doe' });
  }

  if (req.method === 'GET') {
    const { query } = req;
    return res.status(200).json({ name: 'John Doe' });
  } else {
    return res.status(404);
  }
};

export default handler;
