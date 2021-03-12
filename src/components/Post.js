import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
function Post({username, imageUrl,caption}) {
    return (
        <div className="post">
        <div className="post__header">
        <Avatar 
            className="post__avatar"
            alt='RafehQaizi'
            src="https://picsum.photos/100"
        />
        <h3>{username}</h3>
            {/* header  => avartar + uername*/}
        </div>
     
        <img className="post__image" src={imageUrl} alt="" srcset=""/>
            {/* image */}
        <h4 className="post__text">
        <strong>
            {username}
        </strong>
            {caption}
        </h4>
            {/* username + caption */}
        </div>
    )
}

export default Post
