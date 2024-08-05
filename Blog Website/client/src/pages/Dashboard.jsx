import React, { useState } from 'react';
import {Dummy_Posts} from '../data';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts,setPosts]=useState();
  return (
    <section className="dashboard">
      <div className='container dashboard_container'>
        {
          posts.map((post)=>{
            return <article key={post.id} className='dashboard_posts'>
              <div className='dashboard_post-info'>
                <div className='dashboard_post-thumbnail'>
                  <img src={post.thumbnail} alt="Shivani"/>
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className='dashboard_post-actions'>
                <Link to={`/posts/${post.id}`}className='btn sm'>View</Link>
                <Link to={`/posts/${post.id}/edit`}className='btn sm primary'>Edit</Link>
                <Link to={`/posts/${post.id}/delete`}className='btn sm danger'>Delete</Link>
              </div>
            </article>
          })
        }
      </div>
    </section>
  )
}

export default Dashboard