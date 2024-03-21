import "@testing-library/jest-dom";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import Page from "../app/page";
import { Provider } from "react-redux";
import fetchMock from "fetch-mock-jest";
import { makeStore } from "../lib/store";
import { getAllPokemonRes, getPokemonByNameRes } from "./mocks/pokemon";
import { renderWithProviders } from "./test-utils";

function Wrapper(props: { children: React.ReactNode }) {
  return <Provider store={makeStore()}>{props.children}</Provider>;
}

jest.mock("usehooks-ts");

// jest.mock("../lib/features/pokemon/pokemonSlice", () => ({
//   useGetAllPokemonQuery: jest.fn().mockImplementation(() => ({
//     isLoading: false,
//     data: getAllPokemonRes,
//   })),
//   // useGetPokemonByNameQuery: jest.fn(),
// }));

it("renders hook", async () => {
  fetchMock.get(
    { url: "http://localhost:8080/api/pokemon/?page=0" },
    getAllPokemonRes
  );

  renderWithProviders(<Page />);

  // expect(
  //   await screen.findByText("There was an error fetching pokemons")
  // ).toBeInTheDocument();

  const loader = await screen.findByAltText("pokeball loader");
  expect(loader).toBeInTheDocument();

  // await waitFor(() => {
  //   const loader = screen.getByAltText("pokeball loader");
  //   expect(loader).toBeVisible();
  // });

  // await waitFor(() => {
  //   const gridPokemons = screen.getByTestId("grid-pokemons");
  //   expect(gridPokemons).toBeVisible();
  // });

  // await waitFor(() => {
  //   const error = screen.getAllByText("There was an error fetching pokemons");
  //   expect(error).toBeVisible();
  // });
});

