import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const AuthForm = ({
    user,
  open,
  signOut,
  setOpen,
  openSignIn,
  setOpenSignIn,
  logo,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  signUp,
  signIn,
}) => {
    const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  return (
    <div>
      {user ? (
        <>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            LOGOUT
          </Button>
        </>
      ) : (
        <div className="app__loginContainer">
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Sign Up
          </Button>
          <Button
            onClick={() => {
              setOpenSignIn(true);
            }}
          >
            Sign In
          </Button>
        </div>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">
              <img className="app__headerImage" src={logo} alt="" />
              <TextField
                type="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <TextField
                type="text"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <Button onClick={signUp}>SIGN UP</Button>
            </form>
          </center>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <form className="app__signup">
              <img className="app__headerImage" src={logo} alt="" />
              <TextField
                type="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Button onClick={signIn}>SIGN IN</Button>
            </form>
          </center>
        </div>
      </Modal>
    </div>
  );
};
