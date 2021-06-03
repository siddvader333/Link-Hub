import { PayloadAction } from "@reduxjs/toolkit";
import darkModeReducer, { darkModeToggle, initialState } from "./darkModeSlice";

describe("darkMode reducer testing", () => {
  test("Should return initial state if no valid action found", () => {
    expect(darkModeReducer(undefined, {} as PayloadAction)).toEqual(
      initialState
    );
  });

  test("should turn dark mode on if it is off", () => {
    expect(darkModeReducer({ status: false }, darkModeToggle).status).toEqual(
      true
    );
  });

  test("should turn dark mode off if it is on", () => {
    expect(darkModeReducer({ status: true }, darkModeToggle).status).toEqual(
      false
    );
  });
});
