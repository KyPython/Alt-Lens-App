import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { Collapsible } from "../Collapsible";

describe("Collapsible", () => {
  it("renders title and toggles content", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Test Title">
        <Text>Hidden Content</Text>
      </Collapsible>
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(queryByText("Hidden Content")).toBeNull();
    fireEvent.press(getByText("Test Title"));
    expect(getByText("Hidden Content")).toBeTruthy();
  });
});
