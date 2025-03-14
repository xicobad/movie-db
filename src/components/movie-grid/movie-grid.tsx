import React, { Component } from "react";
import { Row, Col, ConfigProvider } from "antd";
import MovieCard from "../movie-card";
import MovieServices from "../../services/movie-services";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const customTheme = {
  token: {
    screenMD: 990,
    screenLG: 1199,
    screenXL: 1400,
    screenXXL: 1630,
  },
};

export default class MovieGrid extends Component {
  movieServices = new MovieServices();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.movieServices
      .getResource()
      .then((movies) => {
        this.setState({ movies: movies.slice(0, 14), loading: false });
      })
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { movies, loading, error } = this.state;

    const hasData = !loading || error;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <MovieView movies={movies} /> : null;

    return (
      <React.Fragment>
        {errorMessage}
        {spinner}
        {content}
      </React.Fragment>
    );
  }
}

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
        <Row gutter={[24, 24]} justify="center">
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} sm={18} md={14} lg={12} xl={10} xxl={7}>
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
      </ConfigProvider>
    </React.Fragment>
  );
};
