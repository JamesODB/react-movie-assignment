import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromBookmarksIcon from "../components/cardIcons/removeFromBookmarks";

const BookmarkedMoviesPage = () => {
  const { bookmarks } = useContext(MoviesContext);

  return (
    <PageTemplate
      title="Bookmarked Movies"
      movies={bookmarks}
      action={(movie) => <RemoveFromBookmarksIcon movie={movie} />}
    />
  );
};

export default BookmarkedMoviesPage;
