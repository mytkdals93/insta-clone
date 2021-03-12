import { useState, useEffect } from "react";
import "./App.css";
import { AuthForm } from "./components/AuthForm";
import ImageUpload from "./components/ImageUpload";
import { Introduction } from "./components/Introduction";
import Post from "./components/Post";
import { auth, db } from "./firebase";
import logo from "./logo.svg";


function App() {
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
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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
  const signOut = ()=>{
    auth.signOut();
  }
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src={logo} alt="" />
        <AuthForm 
        logo={logo}
        user={user}
          open={open}
          openSignIn={openSignIn}
          setOpen={setOpen}
          setOpenSignIn={setOpenSignIn}
          username={username}
          setUsername ={setUsername}
          email={email}
          setEmail ={setEmail}
          password={password}
          setPassword ={setPassword}
          signOut={signOut}
          signIn={signIn}
          signUp={signUp}
        />
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
            <Introduction />
        </div>
      </div>
      <>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to uplaod</h3>
      )}
     </>
    </div>  
  )
}
export default App;
