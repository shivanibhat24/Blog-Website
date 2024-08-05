import React,{useState}from 'react';
import PostItem from '../components/PostItem';
import { Dummy_Posts } from '../data';

const CategoryPosts = () => {
  const [posts,setposts]=useState([Dummy_Posts]);
  return (
    <section className='category_posts'>
      <div className="container category_posts-container">
        {
            posts.map(({id,thumbnail,category,title,desc,authorID})=>
            <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={authorID}/>
          )
        }
        </div>
    </section>
  )
}

export default CategoryPosts