import * as api from "../utils/api";

describe("api", () => {
  it("exports BACKEND_URL", () => {
    expect(api.BACKEND_URL).toContain("http");
  });

  it("exports saveMediaMetadata function", () => {
    expect(typeof api.saveMediaMetadata).toBe("function");
  });
});

export { api };
export default api;

// api