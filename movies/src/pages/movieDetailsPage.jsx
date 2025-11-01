import React from "react";
import { useParams } from "react-router";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const { data: credits, isPending: isCreditsLoading } = useQuery({
    queryKey: ["movieCredits", { id }],
    queryFn: getMovieCredits,
  });

  if (isPending || isCreditsLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />

          {credits && (
            <div style={{ marginTop: "2rem" }}>
              <h3>Cast</h3>
              <ul>
                {credits.cast.slice(0, 10).map((member) => (
                  <li key={member.cast_id}>
                    {member.name} — {member.character}
                  </li>
                ))}
              </ul>

              <h3>Crew</h3>
              <ul>
                {credits.crew.slice(0, 10).map((member) => (
                  <li key={member.credit_id}>
                    {member.name} — {member.job}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
