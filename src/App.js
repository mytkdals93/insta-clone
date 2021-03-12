import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Post from "./components/Post";
import { auth, db } from "./firebase";
import logo from "./logo.svg";

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
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  // useEffect -> Runs a piece of code based a specific condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        setUser(authUser);
      } else {
        //user has logged out...
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    //this is where the code runs
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      //every time a new post is addedd, this code fires...
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(username);
        authUser.user.updateProfile({
          displayName: username,
        });
        setOpen(false);
      })
      .catch((error) => alert(error.message));
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setOpenSignIn(false);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="app">
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

      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="" />
        {user ? (
        <>
          <Button
            onClick={() => {
              auth.signOut();
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
      </div>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to uplaod</h3>
      )}
    </div>
  );
}

export default App;
