import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;
  const { data: body } = await axios.get(
    `https://www.imdb.com/search/title/?title_type=feature${
      title ? `&title=${encodeURI(title.toString())}` : ''
    }`,
    {
      headers: {
        'Accept-Language': 'en-US',
      },
    }
  );

  res.statusCode = 200;
  res.send(body);
};
