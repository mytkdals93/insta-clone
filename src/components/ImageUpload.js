import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Input } from "@material-ui/core";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "./ImageUpload.css";


const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState(``);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [fileInput,setFileInput] = useState("");
    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
            setFileInput(e.target.files[0].fileName)
        }
    }
    const handleUpload = (e)=>{
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_change",
            (snapshot)=>{
                // progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // Error function...
                console.log(error);
                alert(error.message)
            },
            ()=>{
                //complete function...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    // post image inside db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setImage(null);
                    setFileInput("");
                    setProgress(0);
                    setCaption("");
                })
            }
        )
    }
  return (
    <div>
      <form onSubmit={handleUpload} className="upload__form" noValidate autoComplete="off">
      <progress className="upload__progress" value={progress} max="100" />
        <TextField 
        id="standard-basic" 
        label="Enter a caption..." 
        onChange={((e)=>setCaption(e.target.value))}
        value = {caption}
        />
        <Input type="file"
            value={fileInput}
            onChange = {handleChange}
         />
        <Button type="submit">UPLOAD</Button>
      </form>

    </div>
  );
};

export default ImageUpload;
