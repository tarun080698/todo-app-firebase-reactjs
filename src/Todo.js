import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import './Todo.css'

function Todo(props) {
  // console.log(props)
  return (
    <List className="todo_list">
      <ListItem>
        <ListItemText primary={props.todo} secondary={props.todo.timestamp}></ListItemText>
      </ListItem>
    </List>
  );
}

export default Todo;
