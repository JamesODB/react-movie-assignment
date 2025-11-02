import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const RemoveFromBookmarksIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemove = (e) => {
    e.preventDefault();
    context.removeFromBookmarks(movie);
  };

  return (
    <IconButton aria-label="remove from bookmarks" onClick={handleRemove}>
      <BookmarkRemoveIcon color="primary" />
    </IconButton>
  );
};

export default RemoveFromBookmarksIcon;
