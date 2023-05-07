import { View, Text, StyleSheet } from "react-native";

function EmptyTodos({ text }) {
  return (<View style={styles.empty}><Text style={{ fontSize: 24, color: "black" }}>{text}</Text></View>)
}
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default EmptyTodos;

