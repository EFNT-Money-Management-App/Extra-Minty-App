import * as React from 'react';
import './Profile.css';
import { Card } from 'reactstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { IUser } from 'app/shared/model/user.model';
import * as Login from 'app/modules/login/login';


const Profile = () => {
    const [currentUserId, setCurrentUserId] = useState<IUser>(null)
    const [profileUser, setProfileUser] = useState({})
   

    useEffect(() => {
        axios.get('/api/bank-accounts/currentUser')
        .then(response => {
            console.log(response.data)
            setCurrentUserId(response.data)
        })
        .catch((error) => console.log(error))
    }, [])

    const getUserId = () => {
        
    }

    // useEffect(() => {
    //     axios.get(`/api/profiles/${currentUserId.id}`)
    //     .then(response => {
    //         console.log(response.data)
    //         setProfileUser(response.data)
    //     })
    //     .catch((error) => console.log(error))
    // }, [])


    return (
        <div>
            <h2> User Profile</h2>
            <div className='user'>
                <span className='user-image'><img src="../content/images/jhipster_family_member_0_head-192.png" alt="" /></span>
                <span className='user-name'></span>
            </div>
            <div>
                <div  className='user-info'>
                    <table>
                    </table>
               <Card>
                    <div  className='user-info'>
                        <span>First Name: Lola</span>
                        <p>Last Name: Bunny</p>
                        <p>Email:</p>
                        <p>Join Date:</p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
            </div>
        </div>
    )
}
export default Profile;