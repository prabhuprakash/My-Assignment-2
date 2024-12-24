import { useQuery } from "@tanstack/react-query";
import { useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { SignInContext } from "../../Context/SignInStatusProvider";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;
const Select = styled.select`
  display: block;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
`;
const Grid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
`;
const Theater = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Seats = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 90%;
`;

const SeatButton = styled.button`
  background-color: ${(props) =>
    props.$purchased ? "#e74c3c" : props.$selected ? "#2ecc71" : "#7f8c8d"};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: ${(props) => (props.$purchased ? "not-allowed" : "pointer")};
  width: 50px;
  height: 50px;
  font-size: 14px;
  pointer-events: ${(props) => (props.$purchased ? "none" : "auto")};

  &:hover {
    background-color: ${(props) =>
      props.$purchased ? "#c0392b" : props.$selected ? "#27ae60" : "#95a5a6"};
  }
`;

const SelectedSeatsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

const SelectedSeatsList = styled.div`
  font-size: 16px;
`;

const H3 = styled.h3`
  margin: 0;
`;

const BuyTicketsButton = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const Option = styled.option``;

const seatReducer = (state, action) => {
  switch (action.type) {
    case "resetSeats":
      return {
        ...state,
        [action.movieId]: { selectedSeats: [], purchasedSeats: [] }
      };
    case "toggleOn":
      return {
        ...state,
        [action.movieId]: {
          ...state[action.movieId],
          selectedSeats: [
            ...(state[action.movieId]?.selectedSeats || []),
            action.value
          ]
        }
      };
    case "toggleOff":
      return {
        ...state,
        [action.movieId]: {
          ...state[action.movieId],
          selectedSeats: (state[action.movieId]?.selectedSeats || []).filter(
            (seat) => seat !== action.value
          )
        }
      };
    case "purchase":
      return {
        ...state,
        [action.movieId]: {
          selectedSeats: [],
          purchasedSeats: [
            ...(state[action.movieId]?.purchasedSeats || []),
            ...(state[action.movieId]?.selectedSeats || [])
          ]
        }
      };
    default:
      return state;
  }
};

const fetchPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTUyZWMyMGZlOWUxYTkzMzIzOTQwNzFmMzg2YTNmOCIsIm5iZiI6MTczNDc1MjI1Ny4xMzQsInN1YiI6IjY3NjYzODAxNmNlYmE4MjliOTc0YjQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s8XtBP1-lD9E6BgnaruBBzKWU92bQI_weSQNhDvX7a8"
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
};

const TicketBooking = () => {
  const { signInState } = useContext(SignInContext);
  const [seatStates, dispatchSeatStates] = useReducer(seatReducer, {});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const seatsPerSection = 60;

  const movielist = useQuery({
    queryKey: ["movie"],
    queryFn: fetchPopularMovies,
    enabled: true
  });

  if (signInState.action === "LogIn") {
    return (
      <Container>
        <h2>Please sign in to book tickets.</h2>
      </Container>
    );
  }

  return (
    <Container>
      {movielist.isLoading && <p>Loading Movies...</p>}
      {movielist.error && <p>Error: {movielist.error.message}</p>}
      <Grid>
        <Theater>
          {movielist.data &&
          movielist.data.results &&
          movielist.data.results.length > 0 ? (
            <Select
              name="movies"
              onChange={(e) => {
                const movieId = e.target.value;
                if (!movieId) {
                  dispatchSeatStates({
                    type: "resetSeats",
                    movieId: movieId
                  });
                }
              }}
            >
              {movielist.data.results.map((movie) => (
                <Option key={movie.id} value={movie.id}>
                  {movie.title}
                </Option>
              ))}
            </Select>
          ) : (
            !movielist.isLoading && <p>No movies found.</p>
          )}
        </Theater>
        <Theater>
          {selectedMovie && (
            <Seats>
              {Array.from({ length: seatsPerSection }, (_, i) => i + 1).map(
                (seat) => {
                  const seatId = `${seat}`;
                  const movieState = seatStates[selectedMovie] || {
                    selectedSeats: [],
                    purchasedSeats: []
                  };

                  return (
                    <SeatButton
                      key={seatId}
                      $selected={movieState.selectedSeats.includes(seatId)}
                      $purchased={movieState.purchasedSeats.includes(seatId)}
                      onClick={() =>
                        dispatchSeatStates({
                          type: movieState.selectedSeats.includes(seatId)
                            ? "toggleOff"
                            : "toggleOn",
                          value: seatId,
                          movieId: selectedMovie
                        })
                      }
                    >
                      {seatId}
                    </SeatButton>
                  );
                }
              )}
            </Seats>
          )}
          <SelectedSeatsContainer>
            <h3>Selected Seats:</h3>
            <SelectedSeatsList>
              {selectedMovie &&
              seatStates[selectedMovie]?.selectedSeats?.length > 0
                ? seatStates[selectedMovie].selectedSeats.join(", ")
                : "None"}
            </SelectedSeatsList>
            <BuyTicketsButton
              onClick={() =>
                dispatchSeatStates({ type: "purchase", movieId: selectedMovie })
              }
            >
              Buy Tickets
            </BuyTicketsButton>
          </SelectedSeatsContainer>
        </Theater>
      </Grid>
    </Container>
  );
};

export default TicketBooking;
