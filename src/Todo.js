import React, { useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "./Todo.css";
import db from "./firebase.js";
import {
  Button,
  FormControl,
  GridListTile,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring";
import SaveIcon from "@material-ui/icons/Save";
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    Width: 300,
    maxWidth: 300,
    backgroundColor: "#3a3a81",
    color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    color: "#fff",
  },
  pos: {
    color: "lightgrey",
    fontSize: 30,
    maxWidth: 300,
    textAlign: 'start',
    overflowWrap: 'anywhere',
    textAlignLast: 'auto'
  },
  rootHead: {
    ...theme.typography.button,
    backgroundColor: "#3a3a81",
    color: "#fff",
  },
  paper: {
    padding: 3,
    overflowWrap: "anywhere",
    width: 300,
    backgroundColor: "lightgrey",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: 'lightgrey',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const [input, setInput] = useState("");
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const Fade = React.forwardRef(function Fade(props, ref) {
  //   const { in: open, children, onEnter, onExited, ...other } = props;
  //   const style = useSpring({
  //     from: { opacity: 0 },
  //     to: { opacity: open ? 1 : 0 },
  //     onStart: () => {
  //       if (open && onEnter) {
  //         onEnter();
  //       }
  //     },
  //     onRest: () => {
  //       if (!open && onExited) {
  //         onExited();
  //       }
  //     },
  //   });

  //   return (
  //     <animated.div  style={style} {...other}>
  //       {children}
  //     </animated.div>
  //   );
  // });

  // Fade.propTypes = {
  //   children: PropTypes.element,
  //   in: PropTypes.bool.isRequired,
  //   onEnter: PropTypes.func,
  //   onExited: PropTypes.func,
  // };

  function updateTodo(e){
    e.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    handleClose()
  };
  let time = props.todo.timestamp? new Date(props.todo.timestamp.toDate()).toUTCString():"deadline";
  // console.log(time.slice(0,22));
  return (
    <>
      <GridListTile style={{ margin: 8 }}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div className={classes.rootHead}>
              Task{bull}of{bull}the{bull}Day
            </div>
           <Typography className={classes.pos} color="textSecondary">
              {props.todo.todo}
            </Typography>
          </CardContent>
          <CardActions style={{ float: "right", color: "whitesmoke" }}>
            <Typography
              variant="body2"
              component="p"
              style={{
                fontWeight: 800,
                lineHeight: 1.43,
                color: "#00000070",
                fontSize: "medium",
              }}
            >
              {time.slice(0,22)}
            </Typography>
            <Button onClick={handleOpen} style={{ color: "whitesmoke" }}>
              <EditIcon />
            </Button>
            <Button
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
              style={{ color: "whitesmoke" }}
            >
              <DeleteForeverIcon />
            </Button>
          </CardActions>
        </Card>
      </GridListTile>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <h2 id="spring-modal-title">Update the task</h2>
            <form >
              <FormControl>
                <InputLabel style={{ fontSize: 18 }}>
                  <EditIcon style={{ fontSize: 17 }} /> update
                </InputLabel>
                <Input
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  required={true}
                  value={input}
                  style={{ color: "black" }}
                  placeholder={props.todo.todo}
                  autoFocus={true}
                  onChange={(e) => setInput(e.target.value)}
                  multiline={true}
                  fullWidth
                />
              </FormControl>
              <Button style={{ float: "right", color:"black" }}
                disabled={!input}
                variant="contained"
                color="primary"
                type="submit"
                onClick={(e) => updateTodo(e)}
              >
                <SaveIcon />
                update
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Todo;
