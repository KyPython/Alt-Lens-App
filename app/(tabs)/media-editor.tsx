import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { auth } from "../../lib/firebase";

const BACKEND_URL = "https://alt-lens-backend.vercel.app";

// Add a test ActivityIndicator for testing/demo purposes
<ActivityIndicator testID="ActivityIndicator" size="large" color="#4263eb" />;

type MediaItem = {
  id: string;
  title: string;
  altText: string;
  caption?: string;
  transcript?: string;
  mediaUrl: string;
  thumbnail?: string;
};

type FormState = {
  title: string;
  altText: string;
  caption: string;
  transcript: string;
  mediaUrl: string;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa" },
  content: { padding: 24 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  mediaList: { width: "100%" },
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
    alignItems: "center",
  },
  mediaImage: { width: 100, height: 66, borderRadius: 8 },
  mediaInfo: { flex: 1, padding: 12, justifyContent: "center" },
  mediaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 4,
  },
  mediaDesc: { fontSize: 14, color: "#555" },
  editorForm: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
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
    backgroundColor: "#4263eb",
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default function MediaMetadataEditor() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [form, setForm] = useState<FormState>({
    title: "",
    altText: "",
    caption: "",
    transcript: "",
    mediaUrl: "",
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get user id from firebase auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchMedia();
    }
  }, [userId, search, filter]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      if (!userId) throw new Error("You must be logged in.");
      // Build query params
      const params = new URLSearchParams({
        userId,
        ...(search ? { search } : {}),
        ...(filter ? { filter } : {}),
      }).toString();
      const res = await fetch(`${BACKEND_URL}/api/get-media?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch media.");
      setMediaItems(data.media || []);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
    setLoading(false);
  };

  const handleSelectMedia = (media: MediaItem) => {
    setSelectedMedia(media);
    setForm({
      title: media.title || "",
      altText: media.altText || "",
      caption: media.caption || "",
      transcript: media.transcript || "",
      mediaUrl: media.mediaUrl || "",
    });
  };

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev: FormState) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.altText.trim()) return "Alt Text is required.";
    if (!form.mediaUrl.trim()) return "Media URL is required.";
    return null;
  };

  const handleSave = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert("Validation Error", error);
      return;
    }
    if (!selectedMedia) {
      Alert.alert("Error", "No media selected.");
      return;
    }
    setSaving(true);
    try {
      if (!userId) throw new Error("You must be logged in.");
      const res = await fetch(`${BACKEND_URL}/api/update-media-metadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId: selectedMedia.id,
          userId,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update media.");
      Alert.alert("Success", "Media metadata updated!");
      fetchMedia();
      setSelectedMedia(null);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
    setSaving(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Media Metadata Editor</Text>
        {/* Search and Filter UI */}
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Search by title or alt text"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {/* Example filter: could be a dropdown or more advanced UI */}
          <TextInput
            style={[styles.input, { width: 100 }]}
            placeholder="Filter"
            value={filter}
            onChangeText={setFilter}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#4263eb" />
        ) : (
          <>
            {/* Media List */}
            <View style={styles.mediaList}>
              {mediaItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.mediaCard,
                    selectedMedia?.id === item.id && {
                      borderColor: "#4263eb",
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => handleSelectMedia(item)}
                >
                  <Image
                    source={{ uri: item.thumbnail || item.mediaUrl }}
                    style={styles.mediaImage}
                  />
                  <View style={styles.mediaInfo}>
                    <Text style={styles.mediaTitle}>{item.title}</Text>
                    <Text style={styles.mediaDesc} numberOfLines={2}>
                      {item.altText}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* Editor Form */}
            {selectedMedia && (
              <View style={styles.editorForm}>
                <Text style={styles.sectionTitle}>Edit Metadata</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={form.title}
                  onChangeText={(text) => handleChange("title", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Alt Text"
                  value={form.altText}
                  onChangeText={(text) => handleChange("altText", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Caption"
                  value={form.caption}
                  onChangeText={(text) => handleChange("caption", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Transcript"
                  value={form.transcript}
                  onChangeText={(text) => handleChange("transcript", text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Media URL"
                  value={form.mediaUrl}
                  onChangeText={(text) => handleChange("mediaUrl", text)}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  disabled={saving}
                >
                  <Text style={styles.saveButtonText}>
                    {saving ? "Saving..." : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
