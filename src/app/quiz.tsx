import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showAnswer, setShowAnswer] = useState(false);

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
      setCurrentQuestionIndex(Math.floor(Math.random() * data.length));
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  };

  const revealAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const nextQuestion = () => {
    if (questions.length <= 1) {
      return (
        <Text>No more questions. Create more questions to continiue.</Text>
      );
    }
    setCurrentQuestionIndex((prevIndex) => {
      let newIndex = Math.floor(Math.random() * questions.length);
      while (newIndex === prevIndex) {
        newIndex = Math.floor(Math.random() * questions.length);
      }
      setShowAnswer(false);
      return newIndex;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Link href="/" style={styles.topBarTitle}>
          FlashCards App
        </Link>
      </View>
      <View style={styles.content}>
        {currentQuestionIndex !== -1 && (
          <TouchableOpacity onPress={revealAnswer}>
            <Text style={styles.question}>
              {questions[currentQuestionIndex].question}
            </Text>
            {showAnswer && (
              <Text style={styles.answer}>
                {questions[currentQuestionIndex].answer}
              </Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={nextQuestion} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  answer: {
    fontSize: 18,
    textAlign: "center",
    color: "green",
  },
  nextButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E8EAED",
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
