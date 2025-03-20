import { useCallback, useEffect, useState } from "react";
import MovieServices from "../../services/movie-services";
import MovieGrid from "../movie-grid";
import { Layout, Pagination } from "antd";
import SearchPanel from "../search-panel";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import NavTabs from "../nav-tabs/nav-tabs";

import "./App.css";

const { Content } = Layout;
const movieServices = new MovieServices();

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState<Record<number, string>>({});
  const [guestSession, setGuestSession] = useState<string | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<string>("search");

  const clearMovies = () => {
    setMovies([]);
  };

  useEffect(() => {
    loadTrendingMovies();
    loadMovies(currentPage);

    const fetchGenres = async () => {
      const loadGenres = await movieServices.getGenres();
      setGenres(loadGenres);
    };
    fetchGenres();

    const createGuestSessions = async () => {
      const sessionId = await movieServices.createGuestSessions();
      setGuestSession(sessionId);
      localStorage.setItem("guestSession", sessionId);
    };
    createGuestSessions();
  }, [currentPage]);

  const loadRatedMovies = useCallback(async () => {
    if (!guestSession) return;

    try {
      const movies = await movieServices.getRatedMovies(guestSession);
        if(movies.length === 0) {
          console.log("Нет оцененных фильмов")
          return;
        }
      setRatedMovies(movies);
    } catch (error) {
      console.error("Не поставили нигде звезду " + error);
    }
  }, [guestSession]);

  useEffect(() => {
    if (activeTab === "rated" && guestSession) {
      loadRatedMovies();
    }
  }, [activeTab, guestSession, loadRatedMovies]);



  const tabChange = (key: string) => {
    setActiveTab(key);
  };

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

  const fetchMovies = async (query: string) => {
    if (!query) {
      loadTrendingMovies();
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const results = await movieServices.fetchMovie(query);
      if (results.length === 0) {
        clearMovies();
        setError(true);
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
        {loading ? null : (
          <NavTabs activeTab={activeTab} tabChange={tabChange} />
        )}
        {loading
          ? null
          : activeTab === "search" && <SearchPanel onSearch={fetchMovies} />}
        {error && <ErrorIndicator />}
        {loading ? (
          <Spinner />
        ) : (
          <MovieGrid
            movies={activeTab === "search" ? movies : ratedMovies}
            genres={genres}
            guestSession={guestSession}
            isRated={activeTab === "rated"}
            loadRatedMovies={loadRatedMovies}
            activeTab={activeTab}
          />
        )}
        {loading
          ? null
          : activeTab === "search" && (
              <Pagination
                style={{ marginTop: 20 }}
                size="small"
                total={50}
                align="center"
                current={currentPage}
                onChange={handlePageChange}
              />
            )}
      </Content>
    </Layout>
  );
};

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

export default App;
