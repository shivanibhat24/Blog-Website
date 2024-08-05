import React from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link } from 'react-router-dom';
import Thumbnail from '../images/blog1.png'
 
const PostDetail = () => {
  return (
    <section className="post-detail">
        <div className="container post-detail_container">
            <div className="post-detail header">
                <PostAuthor />
            </div>
            <div className="post-detail_buttons">
                <Link to={`posts/werwer/edit`} className='btn sm primary'>Edit</Link>
                <Link to={`posts/werwer/delete`} className='btn sm danger'>Delete</Link>
            </div>
            <h1>This is the Post Title</h1>
            <div className='post-detail_thumbnail'>
                <img src={Thumbnail} alt="Shivani" />
            </div>
            <p>
                Nanna Munna Rahi Hun
            </p>
            <p>
                Mohe Rang do Laal
            </p>
            <p>
                Koi jo mila to mujhe aisa lagta hai jaise meri saari duniya mein geeton ki rut aur rangon ki barkha hai
            </p>
        </div>
        <p>
            Jahan kal dekhe the sapne suhane
        </p>
    </section>
  )
}

export default PostDetail