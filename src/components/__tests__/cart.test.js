import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import RestaurantMenuCard from "../RestaurantMenuCard";
import Header from "../Header";
import Cart from "../Cart";
import MOCK_DATA_NAME from "../mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA_NAME),
  })
);

it("should Load Restaurant Menu Component", async () => {
  await act(async () =>
    render(
      <MemoryRouter initialEntries={["/restaurant/425"]}>
        <Provider store={appStore}>
          <Header />
          <Routes>
            <Route path="/restaurant/:resId" element={<RestaurantMenuCard />} />
          </Routes>
          <Cart />
        </Provider>
      </MemoryRouter>
    )
  );

  const accordionHeader = screen.getByText("Biriyani (5)");
  fireEvent.click(accordionHeader);

  expect(screen.getAllByTestId("foodItems").length).toBe(5);

  expect(screen.getByText("Cart(0 items)")).toBeInTheDocument();

  const addBtns = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtns[0]);

  expect(screen.getByText("Cart(1 items)")).toBeInTheDocument();

  fireEvent.click(addBtns[1]);

  expect(screen.getByText("Cart(2 items)")).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(7);

  fireEvent.click(screen.getByRole("button", { name: "Empty Cart" }));

  expect(screen.getAllByTestId("foodItems").length).toBe(5);

  expect(
    screen.getByText("Cart is empty now . Add Items to Cart")
  ).toBeInTheDocument();
});