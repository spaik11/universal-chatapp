import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Languages from "../Languages/Languages";
import {
  set_Name,
  set_Room,
  set_Language,
} from "../redux/Redux-actions/joinActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      fontFamily: "Roboto",
    },
  },
  margin: {
    margin: theme.spacing(1),
    width: "15ch",
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    top: "50%",
    left: "50%",
    position: "absolute",
    width: "300px",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
}));

const Join = (props) => {
  const classes = useStyles();

  console.log(props);

  return (
    <div className={classes.body}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <h3>Join</h3>
        </div>
        <div>
          <TextField
            label="name"
            name="name"
            type="text"
            onChange={(e) => props.set_Name(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="room"
            name="room"
            type="text"
            onChange={(e) => props.set_Room(e.target.value)}
          />
        </div>
        <div>
          <Languages
            language={props.user.language}
            set_Language={props.set_Language}
          />
        </div>
        <br />
        <Link
          onClick={(e) => (!props.user.name ? e.preventDefault() : null)}
          to={"/chat"}>
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            size="small"
            type="submit">
            Sign In
          </Button>
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.join,
});

export default connect(mapStateToProps, { set_Name, set_Room, set_Language })(
  Join
);
