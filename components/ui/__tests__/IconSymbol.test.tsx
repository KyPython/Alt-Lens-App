import { render } from "@testing-library/react-native";
import React from "react";
import { IconSymbol } from "../IconSymbol";

describe("IconSymbol", () => {
  it("renders without crashing", () => {
    render(<IconSymbol name="chevron.right" color="#000" />);
  });
});
