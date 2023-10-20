import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import formidable from 'formidable';
import { formatFileSize } from 'src/utils';

// https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-Sharp-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95-%EC%9B%8C%ED%84%B0%EB%A7%88%ED%81%AC-%EB%84%A3%EA%B8%B0

// Next.js는 response body 크기가 최대 4MB
export const config = {
  api: {
    // bodyParser: '4MB',
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body, req.query);

      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files: formidable.Files) => {
        if (err) {
          throw err;
        }

        const imageFile = Array.isArray(files.image)
          ? files.image[0]
          : files.image;

        if (!imageFile) {
          return res.status(400).json({ error: '이미지를 찾을 수 없습니다.' });
        }

        const optimizedImageBuffer = await sharp(imageFile.filepath)
          .rotate()
          .resize(640, 640, { fit: 'inside' })
          .toFormat('webp')
          // .toFile('resizeImage.png', (err, info) => {
          //   console.log(err, info);
          // })
          .toBuffer();

        console.log(
          'optimizedImageBuffer',
          formatFileSize(optimizedImageBuffer.length)
        );

        res.setHeader('Content-Type', 'image/webp');
        res.status(200).end(optimizedImageBuffer);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '이미지 최적화 실패' });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ name: 'John Doe' });
  } else {
    return res.status(404);
  }
};

export default handler;
