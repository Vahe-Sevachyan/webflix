import { useState, useEffect } from "react";
import Movie from "../components/MovideCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../styles/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load movies...");
        console.log(err);
      } finally {
        setloading(false);
      }
    };
    loadPopularMovies();
  }, []);

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
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
