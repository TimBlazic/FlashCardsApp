import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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

  const handleCreate = () => {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Please enter both a question and an answer.");
      return;
    }

    const newQuestion = { question, answer };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    saveQuestions(updatedQuestions);

    setQuestion("");
    setAnswer("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="/" style={styles.topBarTitle}>
          FlashCards App
        </Link>
      </View>
      <View>
        <Text style={styles.title}>Create FlashCard</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            placeholder={"Enter a question"}
            value={question}
            onChangeText={setQuestion}
          />
          <TextInput
            style={styles.input}
            placeholder={"Enter an answer"}
            value={answer}
            onChangeText={setAnswer}
          />
          <TouchableOpacity onPress={handleCreate}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Create</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
    top: 30,
    left: 20,
  },
  topBarTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    padding: 15,
    paddingHorizontal: 15,
    width: 300,
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "#E8EAED",
    borderWidth: 2,
    marginBottom: 5,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionList: {
    marginTop: 20,
  },
  questionItem: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 16,
    color: "gray",
  },
});
