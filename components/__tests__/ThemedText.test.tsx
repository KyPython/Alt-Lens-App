import { render } from "@testing-library/react-native";
import React from "react";
import { ThemedText } from "../ThemedText";

describe("ThemedText", () => {
  it("renders text", () => {
    const { getByText } = render(<ThemedText>Test</ThemedText>);
    expect(getByText("Test")).toBeTruthy();
  });
});
