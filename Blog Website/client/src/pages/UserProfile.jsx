import React,{useState}from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../images/Avatar1.png';
import  {FaEdit,FaCheck} from 'react-icons/fa'

const UserProfile = () => {
  const [avatar,setAvatar]=useState(Avatar);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [currentPassword,setCurrentPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [confirmNewPassword,setConfirmNewPassword]=useState('');
  return (
    <section className="profile">
      <div className='container profile_container'>
        <Link to={`/myposts/shivani`} className='btn'></Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={avatar} alt='Shivani' />
            </div>
            <form className="avatar_form">
              <input type="file" name="avatar" id="avatar" onChange={e=>setAvatar(e.target.files[0])} accept='png,jpg,jpeg'/>
              <label htlmFor="avatar"><FaEdit /></label>
            </form>
            <button className="profile_avatar-btn"><FaCheck/></button>
          </div>
          <h1>Shivani Bhat</h1>
          <form className='profile_form'>
            <p className="form_error-message">This is an Error Message</p>
            <input type='text' placeholder='Full Name' name='name' value={name} onChange={e=>setName(e.target.value)}/>
            <input type='email' placeholder='Email' name='email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Password' name='currentPassword' value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/>
            <input type='password' placeholder='New Password' name='newPassword' value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
            <input type='password' placeholder='Confirm New Password' name='confirmNewPassword'value={confirmNewPassword} onChange={e=>setConfirmNewPassword(e.target.value)}/>
            <btn type="submit" className='btn primary'>Update my details</btn>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile