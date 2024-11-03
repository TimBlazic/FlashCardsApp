import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import Flashcard from "../components/flashcard";

export default function List() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const jsonContent = await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + "flashcards.json"
      );
      const data = JSON.parse(jsonContent);
      setQuestions(data);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  };

  const saveQuestions = async (data) => {
    try {
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + "flashcards.json",
        JSON.stringify(data)
      );
    } catch (error) {
      console.error("Error writing JSON file:", error);
    }
  };

  const deleteCard = (index) => {
    let updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="/" style={styles.topBarTitle}>
          FlashCards App
        </Link>
      </View>
      {questions.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.section}>
            <View style={styles.cardWrapper}>
              {questions.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => deleteCard(index)}>
                  <Flashcard question={item.question} answer={item.answer} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noQuestionsContainer}>
          <Text style={styles.noQuestionsText}>
            Hmmm. I don't see any questions.
          </Text>
          <View style={styles.addWrapper}>
            <Link href="/createCard" style={styles.addText}>
              Create a Flash Card
            </Link>
          </View>
        </View>
      )}
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
    top: 0,
    left: 20,
    width: 390,
    backgroundColor: "white",
    paddingVertical: 30,
    zIndex: 1,
  },
  topBarTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 100,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    width: 390,
  },
  cardWrapper: {
    marginTop: 10,
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noQuestionsText: {
    fontSize: 20,
    marginBottom: 20,
  },
  createCardLink: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  addWrapper: {
    borderRadius: 15,
    backgroundColor: "gray",
    display: "flex",
  },
  addText: {
    fontSize: 15,
    color: "white",
    padding: 8,
    paddingHorizontal: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
