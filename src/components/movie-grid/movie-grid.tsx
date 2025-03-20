import React from "react";
import MovieCard from "../movie-card";
import { Row, Col, ConfigProvider, Flex } from "antd";
import MovieServices from "../../services/movie-services";

const movieServices = new MovieServices();

const customTheme = {
  token: {
    screenMD: 990,
    screenLG: 1199,
    screenXL: 1445,
    screenXXL: 1600,
  },
};

interface MovieProps {
  movies: Movie[];
  genres: Record<number, string>;
  guestSession: string | null;
  isRated: boolean;
  loadRatedMovies: () => void;
  activeTab: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  isRated: boolean;
  vote_average: number;
  userRating: number;
}

const MovieGrid: React.FC<MovieProps> = (props) => {
  return (
    <div>
      <MovieView {...props} />
    </div>
  );
};

const MovieView: React.FC<MovieProps> = ({
  movies,
  genres,
  guestSession,
  isRated,
  loadRatedMovies,
  activeTab
}) => {
  const onRate = async (movieId: number, rating: number) => {
    if (!guestSession) return;

    try {
      await movieServices.rateMovie(movieId, rating);
      loadRatedMovies();
    } catch (error) {
      console.error("Ошибка " + error);
    }
  };

  return (
    <React.Fragment>
      <ConfigProvider theme={customTheme}>
        <Flex justify="left">
          <Row gutter={[24, 24]} justify="start">
            {movies.map((movie) => (
              <Col
                key={movie.id}
                xs={24}
                sm={18}
                md={14}
                lg={12}
                xl={12}
                xxl={8}
              >
                <MovieCard
                  title={movie.title}
                  date={movie.release_date}
                  overview={movie.overview}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  genres={movie.genre_ids.map((id) => genres[id as number])}
                  guestSession={guestSession}
                  movieId={movie.id}
                  isRated={isRated}
                  rating={movie.vote_average}
                  userRating={movie.userRating}
                  loadRatedMovies={loadRatedMovies}
                  onRate={(rating) => onRate(movie.id, rating)}
                  activeTab={activeTab}
                />
              </Col>
            ))}
          </Row>
        </Flex>
      </ConfigProvider>
    </React.Fragment>
  );
};

export default MovieGrid;
