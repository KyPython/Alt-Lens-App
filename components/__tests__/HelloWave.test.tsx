import { render } from "@testing-library/react-native";
import React from "react";
import { HelloWave } from "../HelloWave";

describe("HelloWave", () => {
  it("renders waving emoji", () => {
    const { getByText } = render(<HelloWave />);
    expect(getByText("👋")).toBeTruthy();
  });
});
