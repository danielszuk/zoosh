import axios from 'axios';
import { parseHTML } from 'jquery';
import { useCallback } from 'react';
import traverseNodes from '../utils/traverse-nodes';
import { Movie } from '../models/movie.interface';
import getSafe from '../utils/get-safe';

export default function useImdbSearch() {
  return useCallback(async (keyword: string): Promise<Movie[]> => {
    const { data: html } = await axios.get(
      `/api/imdb-search-crawl${keyword ? `?title=${encodeURI(keyword)}` : ''}`
    );
    const movieListNode = traverseNodes(parseHTML(html) as ChildNode[], [
      { id: 'wrapper' },
      { id: 'root' },
      { id: 'pagecontent' },
      { id: 'content-2-wide' },
      { id: 'main' },
      { classNames: ['article'] },
      { classNames: ['lister', 'list', 'detail', 'sub-list'] },
      { classNames: ['lister-list'] },
    ]);
    if (!getSafe(() => movieListNode.childNodes)) return [];

    const movies: Movie[] = [];
    movieListNode.childNodes.forEach((movieCardNode) => {
      const movie: Partial<Movie> = {};

      const movieNode = traverseNodes(movieCardNode.childNodes, [
        {
          classNames: ['lister-item-content'],
        },
      ]);
      if (!movieNode) return;

      const header = traverseNodes(movieNode.children, [
        {
          nodeName: 'H3',
        },
      ]);

      const anchor = traverseNodes(header.children, [
        {
          nodeName: 'A',
        },
      ]);

      const title = anchor.textContent;
      const path = getSafe(() => anchor.attributes.getNamedItem('href').value);
      if (!title || !path) {
        // if required properties missing, abort parsing
        return;
      }
      movie.title = title;
      movie.url = `https://www.imdb.com${path}`;

      const year = traverseNodes(header.children, [
        {
          classNames: ['lister-item-year'],
        },
      ]);
      movie.year = getSafe(() =>
        parseInt(
          // parse year formats like (2012) or (I) (2019)
          year.textContent.match(/\([0-9]*\)/)[0].replace(/[()]/, ''),
          10
        )
      );

      // genre
      Array.from(movieNode.children).forEach((node) => {
        if (node.nodeName === 'P') {
          const genreNode = traverseNodes(node.children, [
            {
              classNames: ['genre'],
            },
          ]);
          if (genreNode) {
            movie.genre = genreNode.textContent
              .replace(/[↵\s]/g, '')
              .split(',');
          }
        }
      });

      movie.rating = getSafe(() =>
        parseFloat(
          traverseNodes(movieNode.children, [
            {
              classNames: ['ratings-bar'],
            },
            {
              classNames: ['ratings-imdb-rating'],
            },
          ]).attributes.getNamedItem('data-value').value
        )
      );

      movies.push(movie as Movie);
    });

    return movies;
  }, []);
}
