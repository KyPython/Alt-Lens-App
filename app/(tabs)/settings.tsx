import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../lib/firebase"; // adjust path as needed
import { useAccessibility } from "../ContextProvider";

export default function AccessibilitySettingsScreen() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("18");
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);

  const { setSettings } = useAccessibility();

  const router = useRouter();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Accessibility Settings</Text>
          <Text style={styles.subtitle}>
            Please log in to manage your accessibility preferences.
          </Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => router.replace("/onboarding")}
          >
            <Text style={styles.saveButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Error", "You must be logged in to save settings.");
      return;
    }
    setSettings({
      highContrast,
      fontSize: Number(fontSize),
      screenReader,
      keyboardNav,
    });

    const preferences = {
      highContrast,
      fontSize: Number(fontSize),
      screenReader,
      keyboardNav,
    };

    try {
      const response = await fetch(
        "https://alt-lens-backend.vercel.app/api/save-preferences",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, preferences }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Backend error:", data);
        throw new Error(data.message || "Failed to save preferences");
      }
      Alert.alert(
        "Settings Saved",
        "Your accessibility preferences have been saved."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Accessibility Settings</Text>
        <Text style={styles.subtitle}>
          Customize your AltLens experience for optimal accessibility.
        </Text>

        {/* High Contrast Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>High Contrast Mode</Text>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            thumbColor={highContrast ? "#4263eb" : "#ccc"}
          />
        </View>

        {/* Font Size Setting */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Font Size</Text>
          <TextInput
            style={styles.input}
            value={fontSize}
            onChangeText={setFontSize}
            keyboardType="numeric"
            placeholder="18"
            accessibilityLabel="Font Size"
          />
        </View>

        {/* Screen Reader Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Screen Reader Support</Text>
          <Switch
            value={screenReader}
            onValueChange={setScreenReader}
            thumbColor={screenReader ? "#4263eb" : "#ccc"}
          />
        </View>

        {/* Keyboard Navigation Toggle */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Keyboard Navigation</Text>
          <Switch
            value={keyboardNav}
            onValueChange={setKeyboardNav}
            thumbColor={keyboardNav ? "#4263eb" : "#ccc"}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4a4e69",
    marginBottom: 32,
    textAlign: "center",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: "#22223b",
    fontWeight: "500",
    flex: 1,
  },
  input: {
    width: 60,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: "#f7f8fa",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#4263eb",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
    marginTop: 24,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
