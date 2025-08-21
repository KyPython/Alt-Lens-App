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

export default function ProfileScreen() {
  // Example user profile state
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@email.com");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handleSave = () => {
    Alert.alert(
      "Profile Saved",
      `Name: ${name}
Email: ${email}
MFA: ${mfaEnabled ? "Enabled" : "Disabled"}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>User Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account details and authentication settings.
        </Text>

        {/* Profile Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Authentication Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentication Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Multi-Factor Authentication</Text>
            <Switch
              value={mfaEnabled}
              onValueChange={setMfaEnabled}
              thumbColor={mfaEnabled ? "#4263eb" : "#ccc"}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
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
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    width: "100%",
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
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: "#22223b",
    fontWeight: "500",
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#4263eb",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
    marginTop: 24,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
