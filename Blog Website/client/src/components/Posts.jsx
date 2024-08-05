import React,{useState} from 'react';
import PostItem from './PostItem';
import { Dummy_Posts } from '../data';

const Posts = () => {
    const [posts,setposts]=useState([Dummy_Posts]);
  return (
    <section className='posts'>
      {
        <div className="container posts_container">
        {
            posts.map(({id,thumbnail,category,title,desc,authorID})=>
            <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={authorID}/>
          )
        }
        </div>
      }
    </section>
  )
}

export default Posts