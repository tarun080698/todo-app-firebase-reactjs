import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";
import db from "./firebase.js";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function Todo(props) {
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
  };

  let time =
    props.todo.timestamp !== null
      ? new Date(props.todo.timestamp.toDate()).toUTCString()
      : "deadline";
  return (
    <List className="todo_list">
      <ListItem>
        <span>
          <ListItemText
            primary={props.todo.todo}
            secondary={time}
          ></ListItemText>
        </span>
        <span>
          <Button onClick={updateTodo}>
            <EditIcon />
          </Button>
          <Button
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          >
            <DeleteForeverIcon />
          </Button>
        </span>
      </ListItem>
    </List>
  );
}

export default Todo;
