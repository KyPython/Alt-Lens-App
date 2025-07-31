import { fireEvent, render, waitFor } from "@testing-library/react-native";
import MediaMetadataEditor from "../(tabs)/media-editor";

// Polyfill fetch if not present (for Jest/node)
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Mock navigation
jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

// Mock firebase auth
jest.mock("../../lib/firebase", () => ({
  auth: {
    currentUser: { uid: "test-user" },
    onAuthStateChanged: (callback: (user: { uid: string } | null) => void) => {
      callback({ uid: "test-user" });
      return () => {};
    },
  },
}));

// Mock fetch to return a plain object with only used properties/methods
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: {
        get: () => null,
      },
      redirected: false,
      type: "basic",
      url: "",
      clone: () => undefined,
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      json: () => Promise.resolve({ media: [] }),
    } as unknown as Response)
  );
});

// Silence Alert
jest.spyOn(global, "alert").mockImplementation(() => {});

describe("MediaMetadataEditor", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the editor title", async () => {
    render(<MediaMetadataEditor />);
    // Simulate fetchMedia loading state
    (global.fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ media: [] }),
              }),
            100
          )
        )
    );
    const { getByTestId } = render(<MediaMetadataEditor />);
    await waitFor(() => {
      expect(getByTestId("ActivityIndicator")).toBeTruthy();
    });
  });

  it("shows login prompt if user is not logged in", () => {
    jest.resetModules();
    jest.doMock("../../lib/firebase", () => ({
      auth: {
        currentUser: null,
        onAuthStateChanged: (
          callback: (user: { uid: string } | null) => void
        ) => {
          callback(null);
          return () => {};
        },
      },
    }));
    // Re-require React, render, and the component after mocking
    const React = require("react");
    const { render } = require("@testing-library/react-native");
    const MediaMetadataEditorNoUser = require("../(tabs)/media-editor").default;
    const { getByText } = render(<MediaMetadataEditorNoUser />);
    expect(getByText("Please log in to manage your media.")).toBeTruthy();
  });

  it("search input updates state", () => {
    const { getByPlaceholderText } = render(<MediaMetadataEditor />);
    const searchInput = getByPlaceholderText("Search by title or alt text");
    fireEvent.changeText(searchInput, "cat");
    expect(searchInput.props.value).toBe("cat");
  });

  it("filter input updates state", () => {
    const { getByPlaceholderText } = render(<MediaMetadataEditor />);
    const filterInput = getByPlaceholderText("Filter");
    fireEvent.changeText(filterInput, "photo");
    expect(filterInput.props.value).toBe("photo");
  });
});

// Removed circular export and unnecessary default export
