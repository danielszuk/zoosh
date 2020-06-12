import { NextApiRequest, NextApiResponse } from 'next';
import * as Crawler from 'crawler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.query;
  const body = await new Promise((resolve, reject) => {
    new Crawler({ jQuery: false }).direct({
      uri: `https://www.imdb.com/search/title/?title_type=feature${
        title ? `&title=${encodeURI(title.toString())}` : ''
      }`,
      callback: (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      },
    });
  });

  res.statusCode = 200;
  res.send(body);
};
