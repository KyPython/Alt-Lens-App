import { useRouter } from "expo-router";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../lib/firebase";

export default function OnboardingScreen() {
  const router = useRouter();
  // const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [authError, setAuthError] = useState("");
  // const [user, setUser] = useState<User | null>(null);

  // const BACKEND_URL = "https://alt-lens-backend.vercel.app";

  async function saveUserToBackend(user: User) {
    try {
      await fetch("https://alt-lens-backend.vercel.app/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          // add more fields if needed
        }),
      });
    } catch (error) {
      console.warn("Failed to save user to backend:", error);
    }
  }

  // Handle login/signup and navigation
  const handleAuth = async () => {
    setLoading(true);
    setAuthError("");
    try {
      let firebaseUser;
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        firebaseUser = result.user;
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        firebaseUser = result.user;
        // Save user to backend after signup
        await saveUserToBackend(firebaseUser);
      }
      // setUser(firebaseUser);
      router.replace("/(tabs)");
    } catch (err: any) {
      setAuthError(err.message);
    }
    setLoading(false);
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert(
        "Password Reset",
        `A password reset link has been sent to ${resetEmail}. Please check your inbox.`
      );
      setResetEmail("");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header Section */}
      <View
        style={{
          alignSelf: "stretch",
          height: 72,
          paddingHorizontal: 64,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 84,
                height: 36,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "black" }}
              >
                AltLens
              </Text>
            </View>
          </View>
          {/* Navigation Links */}
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 32,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>
              Home
            </Text>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>
              Media Library
            </Text>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>
              Accessibility
            </Text>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "400" }}>
              Settings ⚙️
            </Text>
          </View>
          {/* Join Button */}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: "black",
                borderWidth: 1,
                borderColor: "black",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View
        style={{
          alignSelf: "stretch",
          height: 320,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Image
          style={{ alignSelf: "stretch", flex: 1 }}
          source={{ uri: "https://placehold.co/1440x320" }}
        />
        <View
          style={{
            alignSelf: "stretch",
            paddingHorizontal: 64,
            paddingVertical: 40,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 40,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              maxWidth: 1280,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 40,
            }}
          >
            <Text
              style={{
                alignSelf: "stretch",
                color: "black",
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              Empowering Media Accessibility for Everyone
            </Text>
            <Text
              style={{
                alignSelf: "stretch",
                color: "black",
                fontSize: 18,
                fontWeight: "400",
              }}
            >
              AltLens is your go-to solution for managing media accessibility
              effortlessly. Experience a user-friendly platform designed with
              empathy and inclusivity at its core.
            </Text>
          </View>
        </View>
      </View>

      {/* Auth Form Section */}
      <View
        style={{
          alignSelf: "stretch",
          paddingHorizontal: 64,
          paddingVertical: 40,
          backgroundColor: "#f7f8fa",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 24,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "center",
              color: "#22223b",
            }}
          >
            {isLogin ? "Login to AltLens" : "Create an AltLens Account"}
          </Text>
          <TextInput
            style={{
              height: 48,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 16,
              fontSize: 16,
              marginBottom: 12,
              backgroundColor: "#fff",
            }}
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={{
              height: 48,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 16,
              fontSize: 16,
              marginBottom: 12,
              backgroundColor: "#fff",
            }}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {authError ? (
            <Text
              style={{ color: "red", marginBottom: 8, textAlign: "center" }}
            >
              {authError}
            </Text>
          ) : null}
          <TouchableOpacity
            style={{
              backgroundColor: "#4263eb",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 8,
            }}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                {isLogin ? "Login" : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginBottom: 8 }}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={{ color: "#4263eb", fontSize: 16, fontWeight: "500" }}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", marginBottom: 8 }}
            onPress={() => setResetEmail(email)}
          >
            <Text style={{ color: "#4263eb", fontSize: 16, fontWeight: "500" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Password Reset Section */}
      {resetEmail ? (
        <View
          style={{
            alignSelf: "stretch",
            paddingHorizontal: 64,
            paddingVertical: 40,
            backgroundColor: "#f0f0f0",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 400,
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 24,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
                textAlign: "center",
                color: "#22223b",
              }}
            >
              Password Reset
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 12,
                textAlign: "center",
                color: "#22223b",
              }}
            >
              Enter your email address to receive a password reset link.
            </Text>
            <TextInput
              style={{
                height: 48,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 16,
                fontSize: 16,
                marginBottom: 12,
                backgroundColor: "#fff",
              }}
              placeholder="Email"
              placeholderTextColor="#888"
              autoCapitalize="none"
              keyboardType="email-address"
              value={resetEmail}
              onChangeText={setResetEmail}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#4263eb",
                paddingVertical: 14,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={handleForgotPassword}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Send Reset Link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", marginBottom: 8 }}
              onPress={() => setResetEmail("")}
            >
              <Text
                style={{ color: "#4263eb", fontSize: 16, fontWeight: "500" }}
              >
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* Info Section */}
      <View
        style={{
          alignSelf: "stretch",
          paddingHorizontal: 64,
          paddingVertical: 40,
          backgroundColor: "white",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Support • Privacy • Terms of Use • License
        </Text>
      </View>
    </ScrollView>
  );
}
