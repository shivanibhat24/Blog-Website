import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar1 from '../images/Avatar1.png';
import Avatar2 from '../images/Avatar2.jpg';
import Avatar3 from '../images/Avatar3.jpg';

const authorsData=[
  {id:1,avatar:Avatar1,name:"Shivani Bhat",posts:3},
  {id:2,avatar:Avatar2,name:"Chaitanya Bhat",posts:3},
  {id:3,avatar:Avatar3,name:"Vaishnavi Bhat",posts:3},
]
const Authors = () => {
const [authors,setAuthors]=useState(authorsData);
  return (
    <section className="authors">
      <div className="container authors_container">
       { authors.map(({id,avatar,name,posts})=> {
          return <Link key={id} to={`/posts/users/${id}`}>
            <div className="author_avatar">
              <img src={avatar} alt={`Image of ${name}`}/>
            </div>
            <div className="author_info">
              <h4>{name}</h4>
              <p>{posts}</p>
            </div>
          </Link>
        })}
      </div>
    </section>
  )
}

export default Authors