import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  // Example user data and recent activity
  const userData = {
    name: "Jane Doe",
    assets: 12,
    lastLogin: "2025-07-24",
  };

  const recentActivity = [
    { id: 1, action: "Uploaded new photo", time: "2 hours ago" },
    { id: 2, action: "Edited profile", time: "Yesterday" },
    { id: 3, action: "Shared media asset", time: "2 days ago" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to AltLens!</Text>
        <Text style={styles.subtitle}>
          Your personalized dashboard for productivity and growth.
        </Text>

        {/* Overview of user data or media assets */}
        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>User: {userData.name}</Text>
          <Text style={styles.overviewText}>
            Media Assets: {userData.assets}
          </Text>
          <Text style={styles.overviewText}>
            Last Login: {userData.lastLogin}
          </Text>
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Upload Media")}
          >
            <Text style={styles.actionButtonText}>Upload Media</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => alert("Edit Profile")}
          >
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Recent activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <Text style={styles.activityText}>{item.action}</Text>
              <Text style={styles.activityTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Explore features coming soon!")}
        >
          <Text style={styles.buttonText}>Explore Features</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
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
  overview: {
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
  overviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#22223b",
  },
  overviewText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  quickActions: {
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#22223b",
    textAlign: "left",
    alignSelf: "flex-start",
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
  recentActivity: {
    marginBottom: 24,
    width: "100%",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    backgroundColor: "#f0f2fa",
    borderRadius: 4,
    padding: 8,
  },
  activityText: {
    fontSize: 15,
    color: "#22223b",
  },
  activityTime: {
    fontSize: 13,
    color: "#4a4e69",
  },
  button: {
    backgroundColor: "#4263eb",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
