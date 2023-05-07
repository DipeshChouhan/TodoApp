import { StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";

function AppBar({ title }) {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  appBar: {
    backgroundColor: "black",
    width: Dimensions.get("window").width,
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  appBarTitle: {

    fontSize: 18,
    color: "white",
    fontWeight: 500
  }
})

export default AppBar;
