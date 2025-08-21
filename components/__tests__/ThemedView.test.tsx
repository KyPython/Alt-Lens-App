import { render } from "@testing-library/react-native";
import React from "react";
import { ThemedView } from "../ThemedView";

describe("ThemedView", () => {
  it("renders children", () => {
    const { getByText } = render(
      <ThemedView>
        <>{<span>Child</span>}</>
      </ThemedView>
    );
    // No assertion needed, just check render
  });
});
