import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import PopularMovies from "./PopularMovies";

const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
  padding: 15px;
  width: 100%;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  width: 300px;
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  outline: none;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #888;
  }
`;
const OutputField = styled.div`
  margin-top: 40px;
  padding: 30px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 200px;
  transition: all 0.3s ease;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const GridBlock = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GridImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const GridItem = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 5px;

  &:first-child {
    font-weight: bold;
    color: #007bff;
  }
`;

const MovieSearch = () => {
  const [moviename, setMoviename] = useState("");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTUyZWMyMGZlOWUxYTkzMzIzOTQwNzFmMzg2YTNmOCIsIm5iZiI6MTczNDc1MjI1Ny4xMzQsInN1YiI6IjY3NjYzODAxNmNlYmE4MjliOTc0YjQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s8XtBP1-lD9E6BgnaruBBzKWU92bQI_weSQNhDvX7a8"
    }
  };
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${moviename}&include_adult=false&language=en-US&page=1`;
    const fetchedmoviesdata = await fetch(url, options);
    return await fetchedmoviesdata.json();
  };
  const movielist = useQuery({
    queryKey: ["movie", moviename],
    queryFn: fetchMovies,
    enabled: moviename !== ""
  });
  return (
    <>
      <InputFields>
        <label htmlFor="searchText"> Movie Title : </label>
        <Input
          type="text"
          value={moviename}
          onChange={(e) => setMoviename(e.target.value)}
          placeholder="movie name"
          id="searchText"
        />
      </InputFields>
      <OutputField>
        {moviename !== "" ? (
          movielist.isLoading ? (
            <p>Loading...</p>
          ) : movielist.error ? (
            <p>Error: {movielist.error.message}</p>
          ) : movielist.data &&
            movielist.data.results &&
            movielist.data.results.length > 0 ? (
            <Grid>
              {movielist.data.results.map((movie) => (
                <GridBlock key={movie.id}>
                  <GridImg
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={movie.title}
                  />
                  <GridItem key={movie.imdbID}>{movie.title}</GridItem>
                  <GridItem>{movie.release_date}</GridItem>
                </GridBlock>
              ))}
            </Grid>
          ) : (
            !movielist.isLoading && <p>No movies found.</p>
          )
        ) : (
          <PopularMovies />
        )}
      </OutputField>
    </>
  );
};
export default MovieSearch;
