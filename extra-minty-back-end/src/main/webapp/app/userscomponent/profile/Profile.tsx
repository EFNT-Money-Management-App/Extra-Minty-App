import * as React from 'react';
import './Profile.css';
import { Card } from 'reactstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { IUser } from 'app/shared/model/user.model';
import * as Login from 'app/modules/login/login';
import { IProfile } from '../../shared/model/profile.model';
import profile from 'app/entities/profile/profile.reducer';
import { kMaxLength } from 'buffer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser>(null)
    const [profileUser, setProfileUser] = useState<IProfile>(null)
   

    // useEffect(() => {
    //     axios.get('/api/bank-accounts/currentUser')
    //     .then(response => {
    //         console.log(response.data)
    //         setCurrentUserId(response.data)
    //     })
    //     .catch((error) => console.log(error))
    // }, [])

    useEffect(() =>{
        axios.get('/api/account')
        .then(res => {
            console.log(res.data)
            setCurrentUser(res.data)
        })
    },[])
    useEffect(() =>{
        axios.get('api/profiles/current-user')
        .then(res =>{
            console.log(res.data)
            setProfileUser(res.data)
        })
    },[])

    // useEffect(() => {
    //     axios.get(`/api/profiles/${currentUser.id}`)
    //     .then(response => {
    //         console.log(response.data)
    //         setProfileUser(response.data)
    //     })
    //     .catch((error) => console.log(error))
    // }, [])


    return (
        <div>
            <h2>User Profile</h2>
            <div className='user'>
                
                {profileUser && profileUser.profilePicture ? <span className='user-image'>  <img
                              src={`data:${[profileUser.profilePicture]};base64,${profileUser.profilePicture}`}
                              style={{ maxHeight: '200px'}}
                            /> </span> :<span className='user-image'><img src="../content/images/generic-user.png" alt="" /></span> }
                <span className='user-name'></span>
            </div>
            <div>
                <div  className='user-info'>
                    <table>
                    </table>
               <Card>
                {currentUser && profileUser ?
                     <div  className='user-info'>
                        <p>{"First Name: " + currentUser.firstName}</p>
                        <p>{"Last Name: " + currentUser.lastName}</p>
                        <p>{"Email: " + currentUser.firstName}</p>
                        <p>{"Join Date: " + currentUser.createdDate}</p>
                        <p>{"Username: " +currentUser.login}</p>
                        <p>{"Date of Birth: " + profileUser.birthdate}</p>
                        <Link to={`profile/${profileUser.id}/edit`}>
                            <button>Edit Profile</button>
                        </Link>
                        <p></p>
                        <p></p>
                    </div>
                : "Error: User not Found."}
                </Card>
            </div>
        </div>
        </div>
    )
}
export default Profile;