import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Replace with your deployed backend URL
const BACKEND_URL = "https://alt-lens-backend.vercel.app";

const initialMedia = [
  {
    id: 1,
    title: "Sunset Beach",
    thumbnail: "https://placehold.co/120x80",
    altText: "A beautiful sunset over the beach",
    caption: "Sunset at the beach",
    transcript: "Waves crashing, birds chirping, sun setting.",
  },
  {
    id: 2,
    title: "City Skyline",
    thumbnail: "https://placehold.co/120x80",
    altText: "City skyline at night",
    caption: "Night view of the city",
    transcript: "Cars honking, city lights, people walking.",
  },
];

export default function MediaLibraryScreen() {
  const [mediaItems, setMediaItems] = useState(initialMedia);
  const [showUpload, setShowUpload] = useState(false);

  // State for the new media item form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newAltText, setNewAltText] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newTranscript, setNewTranscript] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");

  // Replace with actual user ID if available
  const userId = "demo_user";

  const handleAddMedia = async () => {
    if (!newTitle || !newMediaUrl || !newAltText) {
      Alert.alert("Error", "Please fill in Title, Media URL, and Alt Text.");
      return;
    }

    const newMediaItem = {
      id: mediaItems.length + 1,
      title: newTitle,
      thumbnail: newMediaUrl,
      altText: newAltText,
      caption: newCaption,
      transcript: newTranscript,
    };

    // Send to backend
    try {
      const response = await fetch(`${BACKEND_URL}/api/save-media-metadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId: `media-${Date.now()}`,
          title: newTitle,
          altText: newAltText,
          caption: newCaption,
          transcript: newTranscript,
          userId,
          mediaUrl: newMediaUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save media.");
      }

      Alert.alert("Success", "Media uploaded and saved to backend!");

      setMediaItems([newMediaItem, ...mediaItems]);
      setNewTitle("");
      setNewAltText("");
      setNewCaption("");
      setNewTranscript("");
      setNewMediaUrl("");
      setShowUpload(false);
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
    }
  };

  // ...existing JSX and styles...

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Media Library</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setShowUpload(!showUpload)}
          >
            <Text style={styles.uploadButtonText}>
              {showUpload ? "Cancel" : "Upload New"}
            </Text>
          </TouchableOpacity>
        </View>

        {showUpload && (
          <View style={styles.uploadForm}>
            <Text style={styles.sectionTitle}>Upload New Media</Text>
            <TextInput
              style={styles.input}
              placeholder="Media URL (e.g., https://...)"
              value={newMediaUrl}
              onChangeText={setNewMediaUrl}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Alt Text (required)"
              value={newAltText}
              onChangeText={setNewAltText}
            />
            <TextInput
              style={styles.input}
              placeholder="Caption"
              value={newCaption}
              onChangeText={setNewCaption}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Transcript"
              value={newTranscript}
              onChangeText={setNewTranscript}
              multiline
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddMedia}
            >
              <Text style={styles.saveButtonText}>Add Media</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.mediaList}>
          {mediaItems.map((item) => (
            <View key={item.id} style={styles.mediaCard}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.mediaImage}
              />
              <View style={styles.mediaInfo}>
                <Text style={styles.mediaTitle}>{item.title}</Text>
                <Text style={styles.mediaDesc}>Alt: {item.altText}</Text>
              </View>
            </View>
          ))}
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
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22223b",
  },
  uploadButton: {
    backgroundColor: "#4263eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  uploadForm: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#22223b",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: "#f7f8fa",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  mediaList: {
    width: "100%",
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
    height: "auto",
    aspectRatio: 1.5,
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
});
