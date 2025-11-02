import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Box from "@mui/material/Box";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("none");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  if (ratingFilter === "high") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)
    );
  } else if (ratingFilter === "low") {
    displayedMovies = [...displayedMovies].sort(
      (a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0)
    );
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Header title={title} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 3,
          marginTop: 2,
        }}
      >
        <Box sx={{ flexShrink: 0, width: { xs: "100%", md: "300px" } }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <MovieList action={action} movies={displayedMovies} />
        </Box>
      </Box>
    </Box>
  );
}

export default MovieListPageTemplate;
