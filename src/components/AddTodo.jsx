
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

function AddTodo({addTodo}) {
  const [todoText, setTodoText] = useState("");
  const onAddButtonClick= () => {
    addTodo(todoText);
    Keyboard.dismiss();
    setTodoText("");
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={todoText}
        onChangeText={setTodoText}
        placeholder="New Todo..."
        style={styles.input}
      
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddButtonClick}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "black",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    flex: 2,
    padding: 24,
    backgroundColor: "#242424",
    fontSize: 18,
    color: "#d3d3d3"
  },
});

export default AddTodo;
