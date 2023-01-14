import * as React from 'react';
import './Profile.css';
import { Card } from 'reactstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { IUser } from 'app/shared/model/user.model';
import * as Login from 'app/modules/login/login';
import Joined from './Joined';
import { Row, Col, Container, Tooltip, Button} from 'reactstrap';


// need to find a way to make the user authorized to access their profile picture....
const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser>({})
    const [profileUser, setProfileUser] = useState({})
   

    useEffect(() => {
        axios.get('/api/account')
        .then(response => {
            console.log(response.data)
            setCurrentUser(response.data)
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        axios.get(`/api/profiles/${currentUser.id}`)
        .then(response => {
            console.log(response.data)
            setProfileUser(response.data)
        })
        .catch((error) => console.log(error))
    }, [])

    return (
            <Container fluid="m" className='profile-content'>
                <Row> 
                    <Col sm={{size:"4"}} className='user-image'>
                        <div className='profile-menu'>
                        <div className='user-name'>{currentUser.login}'s Profile</div>
                            <div className='profile-picture'>
                           
                                    <img src="../content/images/jhipster_family_member_0_head-192.png" alt="" />
                            </div>
                        </div>
                        <Card className='menu'>
                            THIS THE MENU 
                            <p>Status: MAKE A FORM</p>
                            <p>List Achievements: IDK</p>
                            <p></p>
                        </Card>
                    </Col>
                    <Col className="bg-light border" l={{offset: 1, size: 'auto'}}>
                        <p className='title'>User Details</p>
                        <Card  className='user-info'>
                                <p>First Name: {currentUser.firstName}</p>
                                <p>Last Name: {currentUser.lastName}</p>
                                <p>Email: {currentUser.email}</p>
                                <p>Join Date: To-Do</p>
                                {/* <Joined currentUser={currentUser} /> */}
                                <p>Peppermint Points: Not Authorized</p>
                        </Card>
                    </Col>
                </Row> 
            </Container>
    )
}
export default Profile;