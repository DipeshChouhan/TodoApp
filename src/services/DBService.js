import {openDatabase} from "react-native-sqlite-storage"
// Creates a database is it is not present

const createTableQuery =
  "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, isDone BOOLEAN)";

const getTodosQuery = "SELECT * FROM todos";
const addTodoQuery = "INSERT INTO todos (title, isDone) values (?, ?)";

const deleteTodoQuery = "DELETE FROM todos WHERE id = ?";
const updateTodoQuery = "UPDATE todos SET isDone = ? WHERE id = ?";

const successcb = () => {
  console.log("database opened successfully");
}

const errorcb = (err) => {
  console.log("errorcb", err);
}

const createDatabase = (dbName = "todo_db") => {
  return openDatabase({name: dbName, location: "default"}, successcb, errorcb);
};

// Create table if not exists
const createTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql(createTableQuery);
  });
};

// Get all todo's in database
const getTodos = (db, onGetCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      getTodosQuery,
      [],
      (_, resultSet) => { onGetCallback(resultSet) },
      (_, error) => {
        console.log("getTodos", error);
      }
    );
  });
};

// add todo adds a todo into database and the onAddCallback recieves id of todo in database
const addTodo = (db, title, onAddCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      addTodoQuery,
      [title, false],
      (_, resultSet) => {
        onAddCallback(resultSet.insertId);
      },
      (_, error) => console.log("addTodo", error)
    );
  });
};

// onDeleteCallback called when rows affected in database
const deleteTodo = (db, todoId, onDeleteCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      deleteTodoQuery,
      [todoId],
      (_, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          onDeleteCallback();
        }
      },
      (_, error) => console.log(error)
    );
  });
};

const updateTodo = (db, todo, onUpdateCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      updateTodoQuery,
      [todo.isDone, todo.id],
      (_, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          onUpdateCallback();
        }
      },
      (_, error) => console.log(error)
    );
  });
};

export {
  createDatabase,
  createTable,
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
