import React from "react";
import MovieCard from "../movie-card";
import { Row, Col, ConfigProvider, Flex } from "antd";



const customTheme = {
  token: {
    screenMD: 990,
    screenLG: 1199,
    screenXL: 1450,
  },
};

interface Movie {
  id: number;
  title: string;
  overview: string;
  image: string;
}

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div>
      <MovieView movies={movies} />
    </div>
  );
};

export default MovieGrid;

interface MoviesViewProps {
  movies: Movie[];
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  genre_ids: string[];
}

const MovieView: React.FC<MoviesViewProps> = ({ movies }) => {
  return (
    <React.Fragment>
      <ConfigProvider theme={customTheme}>
        <Flex justify="left">
        <Row gutter={[24, 24]} justify="start">
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} sm={18} md={14} lg={12} xl={8}>
              <MovieCard
                title={movie.title}
                date={movie.release_date}
                overview={movie.overview}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                genres={movie.genre_ids}
              />
            </Col>
          ))}
        </Row>
        </Flex>
      </ConfigProvider>
    </React.Fragment>
  );
};
