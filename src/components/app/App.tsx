import { useEffect, useState } from "react";
import MovieServices from "../../services/movie-services";
import MovieGrid from "../movie-grid";
import { Layout, Pagination } from "antd";
import SearchPanel from "../search-panel";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";

const { Content } = Layout;
const movieServices = new MovieServices();

import './App.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [genres, setGenres] = useState<Record<number,string>>({})

  const clearMovies = () => {
    setMovies([])
  }

  useEffect(() => {
    loadTrendingMovies();
    loadMovies(currentPage)
    const fetchGenres = async () => {
      const loadGenres = await movieServices.getGenres();
      setGenres(loadGenres);
    };
    fetchGenres()
  }, [currentPage])

  const loadTrendingMovies = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await movieServices.getResource();
      setMovies(data);
    } catch (error) {
      setError(Boolean(error));
    }
    setLoading(false);
  };

  const fetchMovies = async(query: string) => {
    if (!query) {
      loadTrendingMovies();
      return;
    }
 
  setLoading(true);
  setError(false);
  try {
    const results = await movieServices.fetchMovie(query);
    if (results.length === 0) {
      clearMovies()
      setError(true)
    } else {
      setMovies(results);
    }
  } catch (error) {
    setError(Boolean(error));
  }
  setLoading(false);
};

const loadMovies = async (page: number) => {
  setLoading(true);
  setError(false);

  try {
    const { movies } = await movieServices.getMovies(page);
    setMovies(movies);
  } catch (error) {
    setError(Boolean(error));
  }

  setLoading(false);
};

const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

  return (
    <Layout style={{ padding: "20px", background: "#f0f2f5" }}>
      <Content>
        {loading ? null : <SearchPanel onSearch={fetchMovies} />}
        {error && <ErrorIndicator />}
        {loading ? <Spinner /> : <MovieGrid movies={movies} genres={genres} />}
        {loading ? null : 
        <Pagination 
        style={{ marginTop:20 }} 
        size="small" 
        total={50} 
        align="center"
        current={currentPage}
        onChange={handlePageChange}
        />}
      </Content>
    </Layout>
  );
}

export default App;
