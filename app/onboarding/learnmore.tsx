import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LearnMoreScreen() {
  const router = useRouter();

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
          {/* Logo */}
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
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Learn More Hero Section */}
      <View
        style={{
          alignSelf: "stretch",
          minHeight: 400,
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 64,
          paddingVertical: 80,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            color: "black",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Learn More About AltLens
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: "400",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          AltLens is dedicated to making media accessible for everyone. Our
          platform offers streamlined metadata management, enhanced visual
          hierarchy, and full accessibility support. Discover how AltLens can
          help you create a more inclusive media experience.
        </Text>
        <Image
          style={{ width: "100%", height: 200, marginBottom: 32 }}
          source={{ uri: "https://placehold.co/800x200" }}
        />
        <TouchableOpacity
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            backgroundColor: "#4263eb",
            borderRadius: 8,
            elevation: 2,
            marginBottom: 16,
          }}
          onPress={() => router.replace("/(tabs)/explore")}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: "#4263eb",
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#4263eb", fontSize: 18, fontWeight: "600" }}>
            Back to Onboarding
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
