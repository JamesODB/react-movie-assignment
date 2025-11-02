import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const MovieCreditsPage = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movieCredits", { id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const { cast, crew } = data;

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Cast & Crew
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">Cast</Typography>
          {cast.slice(0, 10).map((member) => (
            <Typography key={member.cast_id}>
              {member.name} — {member.character}
            </Typography>
          ))}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5">Crew</Typography>
          {crew.slice(0, 10).map((member) => (
            <Typography key={member.credit_id}>
              {member.name} — {member.job}
            </Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MovieCreditsPage;
