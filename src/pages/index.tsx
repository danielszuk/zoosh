import React, { FormEvent, useState } from 'react';
import {
  TextField,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import OpenInNew from '@material-ui/icons/OpenInNew';
import useUtilClasses from '../styles/use-util-classes.hook';
import useImdbSearch from '../hooks/use-imdb-search';
import useWikipediaSearch from '../hooks/use-wikipedia-search';
import { ImdbMovie } from '../models/imdb-movie.interface';
import { WikipediaMovie } from '../models/wikipedia-movie.interface';
import getSafe from '../utils/get-safe';

interface ActiveMovie {
  imdbData: ImdbMovie;
  wikipediaData?: WikipediaMovie;
}

export default function Index() {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<ImdbMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<ActiveMovie>(null);
  const [imdbLoading, setImdbLoading] = useState<boolean>(false);
  const [wikipediaLoading, setWikipediaLoading] = useState<boolean>(false);
  const utilClasses = useUtilClasses();
  const imdbSearch = useImdbSearch();
  const wikipediaSearch = useWikipediaSearch();

  const onSearch = async (event: FormEvent) => {
    event.preventDefault();
    setMovies([]);
    setImdbLoading(true);
    setMovies(await imdbSearch(keyword));
    setImdbLoading(false);
  };

  const activateMovie = async (imdb: ImdbMovie) => {
    setActiveMovie({
      imdbData: imdb,
    });
    setWikipediaLoading(true);
    setActiveMovie({
      imdbData: imdb,
      wikipediaData: await wikipediaSearch(imdb.title),
    });
    setWikipediaLoading(false);
  };

  return (
    <div>
      <div
        className={utilClasses(['flex', 'itemsCenter', 'contentCenter', 'pY4'])}
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

      {imdbLoading ? (
        <div className={utilClasses(['flex', 'itemsCenter', 'contentCenter'])}>
          <CircularProgress />
        </div>
      ) : (
        ''
      )}

      <div>
        {movies.map((movie) => (
          <Card
            key={movie.url}
            onClick={() => activateMovie(movie)}
            className={utilClasses(['m4', 'first:mT0'])}
          >
            <CardContent>
              <Typography component="h2" className={utilClasses(['textLg'])}>
                {movie.title}
              </Typography>
              <div className={utilClasses(['flex'])}>
                {movie.year ? (
                  <Typography
                    component="p"
                    className={utilClasses(['textXs', 'pR2'])}
                  >
                    {movie.year}
                  </Typography>
                ) : (
                  ''
                )}
                {movie.genre ? (
                  <Typography component="p" className={utilClasses(['textXs'])}>
                    {movie.genre.join(', ')}
                  </Typography>
                ) : (
                  ''
                )}
              </div>
              {movie.rating ? (
                <Typography component="p" className={utilClasses(['textXs'])}>
                  Rating: <b>{movie.rating}</b>
                </Typography>
              ) : (
                ''
              )}
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!activeMovie}
        onClose={() => setActiveMovie(null)}
        aria-labelledby="movie details"
      >
        <DialogTitle>{getSafe(() => activeMovie.imdbData.title)}</DialogTitle>
        <DialogContent>
          {wikipediaLoading ? (
            <div
              className={utilClasses([
                'flex',
                'itemsCenter',
                'contentCenter',
                'mB4',
              ])}
            >
              <CircularProgress />
            </div>
          ) : (
            ''
          )}

          {getSafe(() => activeMovie.wikipediaData.snippet) ? (
            <Typography className={utilClasses(['mB4'])}>
              {activeMovie.wikipediaData.snippet}...
            </Typography>
          ) : (
            ''
          )}

          {getSafe(() => activeMovie.wikipediaData.url) ? (
            <Typography
              component="a"
              href={activeMovie.wikipediaData.url}
              target="_blank"
              className={utilClasses(['flex', 'itemsCenter'])}
            >
              Open Wikipedia page <OpenInNew />
            </Typography>
          ) : (
            ''
          )}

          <Typography
            component="a"
            href={getSafe(() => activeMovie.imdbData.url)}
            target="_blank"
            className={utilClasses(['flex', 'itemsCenter'])}
          >
            Open IMDB page <OpenInNew />
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
