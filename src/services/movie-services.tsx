export default class MovieServices {
  URL = "https://api.themoviedb.org/3";

  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTQ1YTFmYThiNWVjNWE0OGNhYTUwYzY1Y2E5MmQ2MyIsIm5iZiI6MTc0MTYxNTg2NS40NTEsInN1YiI6IjY3Y2VmMmY5ZmYxYTg0MGI5OTExMjFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h5XsNw_1-joZ-jFG4wuMLAkqnXatIVeWbWUAWUy-qec",
    },
  }

  async getResource() {
const res = await fetch(
      `${this.URL}/trending/movie/day?language=en-US`,
      this.options
    );

    if (!res.ok) {
      throw new Error("Error status:" + res.status);
}

    const body = await res.json();
    return body.results
  }

  async fetchMovie(query: string) {
    if (!query) return [];

    query = query.charAt(0).toUpperCase() + query.slice(1)
     
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
    return { movies: body.results};
  }
}

const movieServices = new MovieServices();
console.log(movieServices.getMovies(2).then((body) => console.log(body)));
