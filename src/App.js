import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Todo from "./Todo";
import db from "./firebase.js";
import firebase from "firebase"
import "./App.css";

function App() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      // console.log(snapshot.docs.map((doc) => doc.data()));
      setTodo(snapshot.docs.map((doc) => ({id: doc.id,todo: doc.data().todo, timestamp: doc.data().timestamp})))
    });
  }, []);

  function addTodo(e) {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
  }

  return (
    <div className="App">
      <h1>Hello world!!!!</h1>
      <div className="container">
        <form>
          <FormControl>
            <InputLabel style={{ fontSize: 18 }}>
              <EditIcon style={{ fontSize: 17 }} /> Write a Todo
            </InputLabel>
            <Input
              id="outlined-basic"
              variant="outlined"
              type="text"
              required={true}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </FormControl>
          <Button
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={addTodo}
          >
            ADD
          </Button>
        </form>
      </div>
      <div className="container">
        <ul>
          {todos !== null &&
            todos.map((todo) => {
              return <Todo todo={todo} key={todo.id} />;
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
