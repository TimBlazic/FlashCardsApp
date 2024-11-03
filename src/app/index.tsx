import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>FlashCards App</Text>
      </View>
      <View>
        <View style={styles.border}>
          <Link style={styles.linkCard} href="/createCard">
            Create a Flash Card
          </Link>
        </View>
        <View style={styles.border}>
          <Link style={styles.linkCard} href="/list">
            All Flashcards
          </Link>
        </View>
        <View style={styles.border}>
          <Link style={styles.linkCard} href="/quiz">
            Quiz Me
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    position: "absolute",
    width: 390,
    top: 0,
    left: 20,
    backgroundColor: "white",
    paddingVertical: 30,
    zIndex: 1,
  },
  topBarTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  linkCard: {
    margin: 5,
    padding: 25,
    paddingHorizontal: 45,
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  border: {
    borderRadius: 10,
    backgroundColor: "#E8EAED",
    marginBottom: 5,
  },
});
