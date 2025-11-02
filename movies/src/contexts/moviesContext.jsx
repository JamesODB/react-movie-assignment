import React, { useState, createContext } from "react";

export const MoviesContext = createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) {
      setFavorites([...favorites, movie.id]);
    }
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToBookmarks = (movie) => {
    if (!bookmarks.find((m) => m.id === movie.id)) {
      setBookmarks([...bookmarks, movie]);
    }
  };

  const removeFromBookmarks = (movie) => {
    setBookmarks(bookmarks.filter((m) => m.id !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        bookmarks,
        addToBookmarks,
        removeFromBookmarks,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
