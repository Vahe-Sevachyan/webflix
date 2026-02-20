import { useState } from "react";
import Movie, { MovieCard } from "../components/MovideCard";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { id: 1, title: "John Wick", release_date: 2020 },
    { id: 2, title: "Terminator", release_date: 2023 },
    { id: 3, title: "Matrix", release_date: 1998 },
    { id: 4, title: "Avatar", release_date: 2010 },
  ];
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLocaleLowerCase().includes(searchQuery);
  });

  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies"
            className="search-input"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
          />

          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
