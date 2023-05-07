
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import AppBar from "./src/components/AppBar";
// import Home from './screens/Home';

import Home from './src/screens/Home';
import { createDatabase } from './src/services/DBService';
function App() {
  const todoDb = createDatabase();
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Todo List" />
      <Home db={todoDb} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
export default App;
