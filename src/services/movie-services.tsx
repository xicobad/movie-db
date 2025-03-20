export default class MovieServices {
  URL = "https://api.themoviedb.org/3";

  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmM5NGNmMTAwOWI1MTM0ZmNmMjhiMjc1ZjIxMzdmNCIsIm5iZiI6MTc0MTYxNTg2NS40NTEsInN1YiI6IjY3Y2VmMmY5ZmYxYTg0MGI5OTExMjFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3jNntEa0woKPFLHdW2nRF2TgWs0fZSg5FSH6zXH2UL0",
    },
  };

  async getResource() {
    const res = await fetch(
      `${this.URL}/trending/movie/day?language=en-US`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Error status:" + res.status);
    }

    const body = await res.json();
    return body.results;
  }

  async fetchMovie(query: string) {
    if (!query) return [];

    query = query.charAt(0).toUpperCase() + query.slice(1);

    const res = await fetch(
      `${this.URL}/search/movie?query=${query}&language=en-US`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса: " + res.status);
    }

    const body = await res.json();
    return body.results;
  }

  async getMovies(page: number = 1) {
    const res = await fetch(
      `${this.URL}/trending/movie/day?language=en-US&page=${page}`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса: " + res.status);
    }

    const body = await res.json();
    return { movies: body.results };
  }

  genreMap: Record<number, string> = {};
  async getGenres() {
    const res = await fetch(
      `${this.URL}/genre/movie/list?language=en`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса: " + res.status);
    }

    const body = await res.json();
    this.genreMap = body.genres.reduce(
      (acc: Record<number, string>, genre: Genre) => {
        acc[genre.id] = genre.name;
        return acc;
      },
      {} as Record<number, string>
    );

    return this.genreMap;
  }

  async createGuestSessions() {
    const res = await fetch(
      `${this.URL}/authentication/guest_session/new`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса: " + res.status);
    }

    const body = await res.json();
    if (body.success) {
      return body.guest_session_id;
    } else {
      body.guest_session_id = null;
      throw new Error("Ошибка сессии");
    }
  }

  async rateMovie(movieId: number, rating: number) {
    const guestSessionId = localStorage.getItem("guestSession");

    if (!guestSessionId) {
      throw new Error("Нет гост сессии");
    }

    const res = await fetch(
      `${this.URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
      {
        method: "POST",
        headers: {
          ...this.options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!res.ok) {
      throw new Error(`Ошибка запроса: ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  async getRatedMovies(guestSessionId: string) {
    if (!guestSessionId) {
      return <p>Вы не поставили звёзды ни на одном фильме</p>;
    }

    const res = await fetch(
      `${this.URL}/guest_session/${guestSessionId}/rated/movies?language=en-US`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса: " + res.status);
    }

    const body = await res.json();
    return body.results;
  }
}

interface Genre {
  id: number;
  name: string;
}

const movieServices = new MovieServices();

movieServices.getMovies().then((data) => console.log(data));

console.log(movieServices.createGuestSessions());

console.log(movieServices.rateMovie(447273, 3));
