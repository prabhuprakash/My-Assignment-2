import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { SignInContext } from "../../Context/GlobalProvider";
import { useLocation } from "react-router-dom";

// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
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

const Select = styled.select`
  display: block;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
`;

const Option = styled.option``;

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
      props.purchased ? "#c0392b" : props.$selected ? "#27ae60" : "#95a5a6"};
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

const seatReducer = (seatState, action) => {
  switch (action.type) {
    case "resetSeats":
      return { selectedSeats: [], purchasedSeats: action.moviePurchasedSeats };
    case "toggleOn":
      if (!seatState.selectedSeats.includes(action.value)) {
        return {
          ...seatState,
          selectedSeats: [...seatState.selectedSeats, action.value]
        };
      }
      return seatState;
    case "toggleOff":
      return {
        ...seatState,
        selectedSeats: seatState.selectedSeats.filter(
          (seat) => seat !== action.value
        )
      };
    case "purchase":
      return {
        purchasedSeats: [
          ...seatState.purchasedSeats,
          ...seatState.selectedSeats
        ],
        selectedSeats: []
      };
    default:
      return seatState;
  }
};

const fetchPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1}`;

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

const TicketBooking = () => {
  const { signInState } = useContext(SignInContext);
  //const { movieSeats, setMovieSeats } = useContext(MovieSeatsContext);
  const [seatState, dispatchSeatState] = useReducer(seatReducer, {
    selectedSeats: [],
    purchasedSeats: []
  });
  const location = useLocation();
  console.log(location.state);
  console.log(location.state.movieid);
  const [movieid, setMovieId] = useState(location.state.movieid);
  const seatsPerSection = 60;
  useEffect(() => {
    if (movieid) {
      dispatchSeatState({
        type: "resetSeats",
        //moviePurchasedSeats: movieSeats.get(`${movieid}`)||[],
        moviePurchasedSeats:
          JSON.parse(localStorage.getItem(`${movieid}`)) || []
      });
    }
  }, [movieid]);
  const movielist = useQuery({
    queryKey: ["movie"],
    queryFn: fetchPopularMovies,
    enabled: true
  });

  const updateSetMovieSeats = () => {
    localStorage.setItem(
      `${movieid}`,
      JSON.stringify([...seatState.purchasedSeats, ...seatState.selectedSeats])
    );
    /*const newMap = new Map(movieSeats);
    newMap.set(movieid, [
      ...seatState.purchasedSeats,
      ...seatState.selectedSeats
    ]);
    setMovieSeats(newMap);*/
  };

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
              value={movieid || ""}
              onChange={(e) => {
                setMovieId(e.target.value);
                dispatchSeatState({
                  type: "resetSeats",
                  //moviePurchasedSeats: movieSeats.get(e.target.value) || []
                  moviePurchasedSeats:
                    JSON.parse(localStorage.getItem(`${e.target.value}`)) || []
                });
              }}
            >
              <Option value="" disabled>
                Select a movie
              </Option>
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
        {movieid !== "" ? (
          <Theater>
            <Seats>
              {Array.from({ length: seatsPerSection }, (_, i) => i + 1).map(
                (seat) => {
                  const seatId = `${seat}`;
                  return (
                    <SeatButton
                      key={seatId}
                      $selected={seatState.selectedSeats.includes(seatId)}
                      $purchased={seatState.purchasedSeats.includes(seatId)}
                      onClick={() =>
                        dispatchSeatState({
                          type: seatState.selectedSeats.includes(seatId)
                            ? "toggleOff"
                            : "toggleOn",
                          value: seatId
                        })
                      }
                    >
                      {seatId}
                    </SeatButton>
                  );
                }
              )}
            </Seats>
            <SelectedSeatsContainer>
              <h3>Selected Seats:</h3>
              <SelectedSeatsList>
                {seatState.selectedSeats.length > 0
                  ? seatState.selectedSeats.join(", ")
                  : "None"}
              </SelectedSeatsList>
              <BuyTicketsButton
                onClick={() => {
                  dispatchSeatState({ type: "purchase" });
                  updateSetMovieSeats();
                }}
                disabled={seatState.selectedSeats.length === 0}
              >
                Buy Tickets
              </BuyTicketsButton>
            </SelectedSeatsContainer>
          </Theater>
        ) : (
          <Theater></Theater>
        )}
      </Grid>
    </Container>
  );
};

export default TicketBooking;
