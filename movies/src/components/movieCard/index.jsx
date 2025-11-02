import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import img from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites, removeFromFavorites, bookmarks, addToBookmarks, removeFromBookmarks } = useContext(MoviesContext);
  const releaseDate = new Date(movie.release_date);

  const isFavorite = favorites.includes(movie.id);
  const isBookmarked = bookmarks.some((m) => m.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    isFavorite ? removeFromFavorites(movie) : addToFavorites(movie);
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    isBookmarked ? removeFromBookmarks(movie) : addToBookmarks(movie);
  };

  return (
    <Card sx={{ position: "relative" }}>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ height: 500 }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
        />
        {isBookmarked && (
          <BookmarkIcon
            color="primary"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "2px",
            }}
          />
        )}
      </Box>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />{" "}
              {releaseDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? "error" : "primary"} />
        </IconButton>
        <IconButton aria-label="toggle bookmark" onClick={handleBookmarkClick}>
          {isBookmarked ? (
            <BookmarkIcon color="primary" />
          ) : (
            <BookmarkAddIcon color="primary" />
          )}
        </IconButton>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
