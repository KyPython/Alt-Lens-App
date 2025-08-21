import { render } from "@testing-library/react-native";
import React from "react";
import { ExternalLink } from "../ExternalLink";

describe("ExternalLink", () => {
  it("renders without crashing", () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>);
  });
});
