
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
// import todos from "../data";
// import Todo from "../components/Todo";
import Todo from "../components/Todo";
import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import {
  addTodo,
  getTodos,
  createTable,
  deleteTodo,
  updateTodo,
} from "../services/DBService";
import EmptyTodos from "../components/EmptyTodos";


function Home({ db }) {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createTable(db);
    getTodos(db, (data) => {
      const list = [];
      for (let i = 0; i < data.rows.length; i++) {
        list.push(data.rows.item(i));
      }
      setTodoItems(list);
    });

    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <View style={styles.altHome}><Text style={{ fontSize: 24, color: "black" }}>loading...</Text></View>;
  }

  const renderTodos = ({ item }) => {
    return (
      <Todo
        title={item.title}
        todoId={item.id}
        deleteTodo={() => onDeleteTodo(item.id)}
        checkTodo={(value) => onCheckTodo(item.id, value)}
        isDone={item.isDone}
      />
    );
  };
  const onDeleteTodo = (todoId) => {
    deleteTodo(db, todoId, () => {
      const filteredTodos = todoItems.filter((todo) => todo.id !== todoId);
      setTodoItems(filteredTodos);
    });
  };

  const onAddTodo = (todoTitle) => {
    if (todoTitle === "") return;
    addTodo(db, todoTitle, (todoId) => {
      const updatedTodos = [...todoItems];
      updatedTodos.push({ id: todoId, title: todoTitle, isDone: false });
      setTodoItems(updatedTodos);
    });
  };

  const onCheckTodo = (todoId, value) => {
    updateTodo(db, { id: todoId, isDone: value }, () => {
      let index = 0;
      for (; index < todoItems.length; index++) {
        if (todoItems[index].id === todoId) break;
      }
      const updatedTodos = [...todoItems];
      updatedTodos[index].isDone = value;
    });
  };

  const resolveView = () => {
    if (todoItems.length < 1) {
      return <EmptyTodos text="Please click Add to add a todo" />;
    }
    return (

      <FlatList
        data={todoItems}
        keyExtractor={(todo) => todo.id}
        renderItem={renderTodos}
        style={styles.list}
        horizontal={false}
      />
    );
  }

  return (
    <View style={styles.home}>
      {resolveView()}
      <AddTodo addTodo={onAddTodo} />
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "flex-start",
    width: Dimensions.get("window").width,
  },
  list: {
    width: Dimensions.get("window").width,
    padding: 8,
  },
});
export default Home;
