export default class MovieServices {
  async getResource() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTQ1YTFmYThiNWVjNWE0OGNhYTUwYzY1Y2E5MmQ2MyIsIm5iZiI6MTc0MTYxNTg2NS40NTEsInN1YiI6IjY3Y2VmMmY5ZmYxYTg0MGI5OTExMjFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h5XsNw_1-joZ-jFG4wuMLAkqnXatIVeWbWUAWUy-qec",
      },
    };
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );

    if (!res.ok) {
      throw new Error("Error status:" + res.status);
    }

    const body = await res.json();

    return body.results
  }
}

const movieServices = new MovieServices();
console.log(
  movieServices.getResource().then((data) => {
    console.log(data);
  })
);
