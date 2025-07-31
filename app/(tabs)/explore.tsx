// Removed the "Accessibility Settings" button from Quick Actions

import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExploreScreen() {
  const featuredMedia = [
    {
      id: 1,
      title: "Inclusive Design Guide",
      description: "Learn how AltLens empowers accessibility for all users.",
      image: "https://placehold.co/300x180",
    },
    {
      id: 2,
      title: "Metadata Best Practices",
      description: "Streamline your media management with AltLens.",
      image: "https://placehold.co/300x180",
    },
    {
      id: 3,
      title: "Visual Hierarchy Tips",
      description: "Enhance navigation and clarity for your content.",
      image: "https://placehold.co/300x180",
    },
  ];

  const tips = [
    "Use clear, descriptive metadata for all media assets.",
    "Enable Multi-Factor Authentication for added security.",
    "Design with accessibility in mind: color contrast, readable fonts, and keyboard navigation.",
    "Regularly update your profile and explore new features.",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore AltLens</Text>
        <Text style={styles.subtitle}>
          Discover new features, guides, and tips to maximize your AltLens
          experience.
        </Text>

        {/* Featured Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Media</Text>
          {featuredMedia.map((media) => (
            <View key={media.id} style={styles.mediaCard}>
              <Image source={{ uri: media.image }} style={styles.mediaImage} />
              <View style={styles.mediaInfo}>
                <Text style={styles.mediaTitle}>{media.title}</Text>
                <Text style={styles.mediaDesc}>{media.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Accessibility & Productivity Tips
          </Text>
          {tips.map((tip, idx) => (
            <View key={idx} style={styles.tipItem}>
              <Text style={styles.tipText}>• {tip}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Browse Media Library")}
          >
            <Text style={styles.actionButtonText}>Browse Media Library</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22223b",
    marginTop: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4a4e69",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#22223b",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  mediaCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: "hidden",
  },
  mediaImage: {
    width: 100,
    height: 60,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  mediaInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  mediaDesc: {
    fontSize: 14,
    color: "#555",
  },
  tipItem: {
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  tipText: {
    fontSize: 15,
    color: "#22223b",
  },
  quickActions: {
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#4263eb",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 4,
    alignItems: "center",
    width: "100%",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
