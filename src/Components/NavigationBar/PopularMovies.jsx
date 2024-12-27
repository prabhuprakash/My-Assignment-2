import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import styled, { keyframes } from "styled-components";

const TextInputFields = styled.div`
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
const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: ${(props) =>
    props.$active ? "6px solid #f3f3f3" : ""}; /* Light grey */
  border-top: ${(props) =>
    props.$active ? "6px solid #3498db" : ""}; /* Blue */
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: ${spin} 0.5s linear infinite;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #4f8bb3;
    cursor: not-allowed;
  }
`;

const OutputField = styled.div`
  margin-top: 20px;
  padding: 10px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const H3 = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const GridBlock = styled.button`
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
const pagereducer = (pageNumber, action) => {
  switch (action.type) {
    case "nextPage":
      return { count: pageNumber.count + 1 };
    case "previousPage":
      return { count: pageNumber.count > 1 ? pageNumber.count - 1 : 1 };
    default:
      return pageNumber;
  }
};

const PopularMovies = () => {
  const [pageNumber, dispatchPageNumber] = useReducer(pagereducer, {
    count: 1
  });

  const navigate = useNavigate();

  const [moviename, setMoviename] = useState("");

  const [loadingState, setLoadingState] = useState(false);

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

  const movielistsearch = useQuery({
    queryKey: ["movie", moviename],
    queryFn: fetchMovies,
    enabled: moviename !== ""
  });

  const fetchPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber.count}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTUyZWMyMGZlOWUxYTkzMzIzOTQwNzFmMzg2YTNmOCIsIm5iZiI6MTczNDc1MjI1Ny4xMzQsInN1YiI6IjY3NjYzODAxNmNlYmE4MjliOTc0YjQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s8XtBP1-lD9E6BgnaruBBzKWU92bQI_weSQNhDvX7a8" // Replace 'YOUR_API_KEY' with your actual API key
      }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  };

  const movielist = useQuery({
    queryKey: ["movie", pageNumber.count],
    queryFn: fetchPopularMovies,
    enabled: true
  });

  return (
    <>
      <TextInputFields>
        <label htmlFor="searchText"> Movie Title : </label>
        <Input
          type="text"
          defaultValue={moviename}
          onChange={
            () => {
              setLoadingState(true);
            }
            //setLoadingState(true);
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setLoadingState(false);
              setMoviename(e.target.value);
            } else {
              console.log(movielistsearch.isLoading);
              setLoadingState(movielistsearch.isLoading);
            }
          }}
          placeholder="movie name"
          id="searchText"
        />
        <Loader $active={loadingState} />
      </TextInputFields>
      {moviename !== "" ? (
        movielistsearch.data &&
        movielistsearch.data.results &&
        movielistsearch.data.results.length > 0 ? (
          <OutputField>
            <Grid>
              {movielistsearch.data.results.map((movie) => (
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
          </OutputField>
        ) : (
          <OutputField>
            <p>No movies found.</p>
          </OutputField>
        )
      ) : (
        <>
          <OutputField>
            {movielist.data &&
            movielist.data.results &&
            movielist.data.results.length > 0 ? (
              <>
                <InputFields>
                  <Button
                    onClick={() => {
                      dispatchPageNumber({ type: "previousPage" });
                    }}
                    disabled={pageNumber.count === 1}
                  >
                    Previous Page
                  </Button>
                  <H3>Popular Movies</H3>
                  <Button
                    onClick={() => {
                      dispatchPageNumber({ type: "nextPage" });
                    }}
                  >
                    Next Page
                  </Button>
                </InputFields>
                <Grid>
                  {movielist.data.results.map((movie) => (
                    <GridBlock
                      key={movie.id}
                      onClick={() => {
                        navigate("/TicketBooking", {
                          state: { movieid: `${movie.id}` }
                        });
                      }}
                    >
                      <GridImg
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                        }
                        alt={movie.title}
                      />
                      <GridItem>{movie.title}</GridItem>
                      <GridItem>
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "N/A"}
                      </GridItem>
                    </GridBlock>
                  ))}
                </Grid>
              </>
            ) : (
              <InputFields>
                <Loader $active={true} />
              </InputFields>
            )}
          </OutputField>
        </>
      )}
    </>
  );
};

export default PopularMovies;
