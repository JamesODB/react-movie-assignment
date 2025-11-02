import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const AddToBookmarksIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToBookmarks = (e) => {
    e.preventDefault();
    context.addToBookmarks(movie);
  };

  return (
    <IconButton aria-label="add to bookmarks" onClick={handleAddToBookmarks}>
      <BookmarkAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToBookmarksIcon;
