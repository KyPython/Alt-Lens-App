import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";
import { HapticTab } from "../HapticTab";

describe("HapticTab", () => {
  it("renders without crashing", () => {
    render(
      <NavigationContainer>
        <HapticTab onPress={() => {}}>Tab</HapticTab>
      </NavigationContainer>
    );
  });
});

export { HapticTab };
