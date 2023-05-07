import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useState } from "react";

function Todo({ title, isDone, deleteTodo, checkTodo }) {
  const [toggleCheckbox, setToggleCheckbox] = useState(isDone === 1);
  const onDeleteButtonClick = () => {
    deleteTodo();
  };

  const onCheckBoxClick = (value) => {
    checkTodo(value);
    setToggleCheckbox(value);
  };

  return (
    <View style={styles.todo}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onCheckBoxClick(!toggleCheckbox)}
          activeOpacity={1}
          style={styles.buttons}
        >

          <CheckBox value={toggleCheckbox} onValueChange = {(newValue) => onCheckBoxClick(newValue)} style={styles.icon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            { textDecorationLine: toggleCheckbox ? "line-through" : "none", color: "#d3d3d3" },
          ]}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={onDeleteButtonClick}>
        <Image source={require("../assets/delete.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    color: "black",
    flex: 1,
    backgroundColor: "#242424",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 8,
    marginBottom: 4,
    borderRadius: 8,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    margin: 8,
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
  },
  buttons: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Todo;
