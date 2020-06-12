import React, { FormEvent, useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useUtilClasses from '../styles/use-util-classes.hook';
import useImdbSearch from '../hooks/use-imdb-search';
import useWikipediaSearch from '../hooks/use-wikipedia-search';
import { ImdbMovie } from '../models/imdb-movie.interface';
import { WikipediaMovie } from '../models/wikipedia-movie.interface';

interface ActiveMovie {
  imdbData: ImdbMovie;
  wikipediaData?: WikipediaMovie;
}

export default function Index() {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<ImdbMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<ActiveMovie>(undefined);
  const utilClasses = useUtilClasses();
  const imdbSearch = useImdbSearch();
  const wikipediaSearch = useWikipediaSearch();

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    setMovies(await imdbSearch(keyword));
  };

  const activateMovie = async (imdb: ImdbMovie) => {
    setActiveMovie({
      imdbData: imdb,
      wikipediaData: await wikipediaSearch(imdb.title),
    });
  };

  return (
    <div>
      <div
        className={utilClasses(['flex', 'itemsCenter', 'contentCenter', 'pY3'])}
      >
        <form onSubmit={onSearch}>
          <TextField
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            size="small"
            label="Movie name"
            variant="outlined"
          />
          <IconButton type="submit" aria-label="search" color="primary">
            <SearchIcon />
          </IconButton>
        </form>
      </div>

      <div>
        {movies.map((movie) => (
          <div key={movie.url} onClick={() => activateMovie(movie)}>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
