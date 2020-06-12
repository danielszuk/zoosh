import React, { FormEvent, useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useUtilClasses from '../styles/use-util-classes.hook';
import useImdbSearch from '../hooks/use-imdb-search';
import { Movie } from '../models/movie.interface';

export default function Index() {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const utilClasses = useUtilClasses();
  const imdbSearch = useImdbSearch();

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    setMovies(await imdbSearch(keyword));
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
          <div key={movie.url}>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
