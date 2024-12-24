import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import styled from "styled-components";

const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const GridBlock = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

const GridImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const GridItem = styled.div`
  padding: 10px;
  font-size: 1rem;
  color: #555;
`;

const PopularMovies = () => {
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

  const [pageNumber, dispatchPageNumber] = useReducer(pagereducer, {
    count: 1
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
      <InputFields>
        <Button
          onClick={() => {
            dispatchPageNumber({ type: "previousPage" });
          }}
          disabled={pageNumber.count === 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            dispatchPageNumber({ type: "nextPage" });
          }}
        >
          Next Page
        </Button>
      </InputFields>

      <OutputField>
        {/* Loading state */}
        {movielist.isLoading && <p>Loading Popular Movies...</p>}

        {/* Error state */}
        {movielist.error && <p>Error: {movielist.error.message}</p>}

        {/* Popular Movies Results */}
        {movielist.data &&
        movielist.data.results &&
        movielist.data.results.length > 0 ? (
          <>
            <H3>Popular Movies</H3>
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
          !movielist.isLoading && <p>No popular movies found.</p>
        )}
      </OutputField>
    </>
  );
};

export default PopularMovies;
