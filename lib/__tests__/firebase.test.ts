import * as firebase from "../firebase";

describe("firebase exports", () => {
  it("exports auth and db", () => {
    expect(firebase.auth).toBeDefined();
    expect(firebase.db).toBeDefined();
  });

  it("exports utility functions", () => {
    expect(typeof firebase.registerWithEmail).toBe("function");
    expect(typeof firebase.signInWithEmail).toBe("function");
    expect(typeof firebase.subscribeToAuthChanges).toBe("function");
    expect(typeof firebase.signInWithGoogle).toBe("function");
    expect(typeof firebase.signOutUser).toBe("function");
  });
});

export { firebase };
export default firebase;

// firebase