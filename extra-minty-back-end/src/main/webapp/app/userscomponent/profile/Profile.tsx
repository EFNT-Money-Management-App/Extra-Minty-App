import * as React from 'react';
import './Profile.css';
import { Card, Button, FormGroup, Input, ListGroup, ListGroupItem, Col, Container, Row } from 'reactstrap';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { TextFormat } from 'react-jhipster';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { IUser } from 'app/shared/model/user.model';
import * as Login from 'app/modules/login/login';
import { IProfile } from '../../shared/model/profile.model';
import profile from 'app/entities/profile/profile.reducer';
// import { MaxLength } from 'buffer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser>({})
    const [profileUser, setProfileUser] = useState<IProfile>({})
   

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
        <Container fluid="m" className='profile-content'>
                <Row> 
                    <Col sm={{size:"4"}} className='left-column'>
                        <Container className='menu'>
                        <ListGroup className='list'>
                        <Container className='title'>Account Settings</Container>
                                    <FormGroup>
                                        <Input  placeholder="Update Username" type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input  placeholder="Update First Name" type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Update Last Name" type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Update Email" type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Update Password" type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input placeholder="Re-Enter New Password"type="text"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                            </ListGroup>
                        </Container>
                        <Container className='bottom-left-card'>
                        <Container className='title'>Your Achievements</Container>

                        </Container>
                    </Col>
                    <Col className="right-column" l={{offset: 1, size: 'auto'}}>
                        <Container className='details-card'>
                        <Container className='title'>{currentUser.firstName}'s Profile</Container>
                        <Container  className='user-info'>
                        <div className='user-title'>
                            <div className='profile-picture' >
                                {profileUser && profileUser.profilePicture ? <span className='user-image'>  <img
                                src={`data:${[profileUser.profilePicture]};base64,${profileUser.profilePicture}`}
                                style={{ maxHeight: '200px'}}
                                /> </span> :<span className='user-image'><img src="../content/images/generic-user.png" alt="" /></span> }
                                {/* <img className="picture" src="../content/images/profile-pic.jpeg" alt="User Image"/> */}
                            </div>
                        </div>
                            <Container className='title'>Your Details</Container>
                            <ListGroup className='list'>
                            {currentUser && profileUser ?
                            <div >
                               <ListGroupItem className='form'>{"Username: " +currentUser.login}</ListGroupItem>
                                <ListGroupItem>{"First Name: " + currentUser.firstName}</ListGroupItem>
                                <ListGroupItem>{"Last Name: " + currentUser.lastName}</ListGroupItem>
                                <ListGroupItem>{"Email: " + currentUser.firstName}</ListGroupItem>
                                <ListGroupItem>{"Date of Birth: " + profileUser.birthdate}</ListGroupItem>
                                <ListGroupItem>Join Date: {currentUser.createdDate ? <TextFormat value={currentUser.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</ListGroupItem>
                                <ListGroupItem>Peppermint Points: {profileUser.peppermintPoints}</ListGroupItem>
                                <Link to={`profile/${profileUser.id}/edit`}>
                                    <button>Edit Profile</button>
                                </Link>
                            </div>
                            : "Error: User not Found."}
                            </ListGroup>
                        </Container>
                        </Container>
                    </Col>
                </Row> 
            </Container>
    )
}
export default Profile;