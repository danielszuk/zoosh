import axios from 'axios';
import { useCallback } from 'react';
import getSafe from '../utils/get-safe';
import { WikipediaMovie } from '../models/wikipedia-movie.interface';

export default function useWikipediaSearch() {
  return useCallback(async (movieName: string): Promise<
    WikipediaMovie | undefined
  > => {
    // search for the movie
    const { data: listRes } = await axios.get(
      `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&list=search&srsearch=${encodeURI(
        movieName
      )}(film)`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const result: { snippet: string; pageid: number } = getSafe(
      () => listRes.query.search[0]
    );
    if (!result) return undefined; // result is required
    const { snippet, pageid } = result;
    if (!pageid) return undefined; // pageid is required

    // get url
    const { data: infoRes } = await axios.get(
      `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=info&inprop=url&pageids=${pageid}`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const url = getSafe(() => infoRes.query.pages[pageid].fullurl);
    if (!url) return undefined; // url is required

    return {
      snippet,
      url,
    };
  }, []);
}
