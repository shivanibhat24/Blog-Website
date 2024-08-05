import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/Avatar1.png'

const PostAuthor = () => {
  return (
    <Link to={'posts/users/shivani'} className='post_author'>
        <div className="posts_author-avatar">
            <img src={Avatar} alt='Author' />
        </div>
        <div className="post_author-details">
            <h5>By:Shivani Bhat</h5>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor