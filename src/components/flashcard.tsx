import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Flashcard = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.square}></View>
      <View style={styles.itemRight}>
        <Text style={[styles.text, styles.question]}>{props.question}</Text>
        <Text style={[styles.text, styles.answer]}>{props.answer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#E8EAED",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemRight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    maxWidth: "80%",
  },
  question: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  answer: {
    color: "gray",
  },
});

export default Flashcard;
