import * as React from 'react';
import './Profile.css';
import { Card, CardHeader } from 'reactstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { IUser } from 'app/shared/model/user.model';
import * as Login from 'app/modules/login/login';
import Joined from './Joined';
import { Row, Col, Container, Tooltip, Button} from 'reactstrap';
import { APP_DATE_FORMAT } from "app/config/constants";
import { TextFormat } from "react-jhipster";
import{ ListGroup, ListGroupItem, Form, FormGroup, Input, Label} from 'reactstrap';


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
<<<<<<< HEAD
            <Container fluid="m" className='profile-content'>
                <Row> 
                    <Col sm={{size:"4"}} className='left-column'>
                        <Card className='menu'>
                        <ListGroup className='list'>
                        <Card className='title'>Account Settings</Card>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Update Username" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Update First Name" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Update Last Name" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Update Email" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Update Password" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <Input id="exampleEmail" name="email" placeholder="Re-Enter New Password" type="email"/>
                                        <Button className='apply-button'> Apply Changes</Button>
                                    </FormGroup>
                            </ListGroup>
                        </Card>
                        <Card className='bottom-left-card'>
                        <Card className='title'>Your Achievements</Card>
                            
                        </Card>
                    </Col>
                    <Col className="right-column" l={{offset: 1, size: 'auto'}}>
                        <Card className='details-card'>
                        <Card className='title'>{currentUser.firstName}'s Profile</Card>
                        <Container  className='user-info'>
                        <div className='user-title'>
                        <div className='user-name'></div>
                            <div className='profile-picture'>
                                    <img className="picture" src="../content/images/profile-pic.jpeg" alt="User Image"/>
                            </div>
                        </div>
                            <Card className='title'>Your Details</Card>
                            <ListGroup className='list'>
                                <ListGroupItem>Username: {currentUser.login}</ListGroupItem>
                                <ListGroupItem>First Name: {currentUser.firstName}</ListGroupItem>
                                <ListGroupItem>Last Name: {currentUser.lastName}</ListGroupItem>
                                <ListGroupItem>Email: {currentUser.email}</ListGroupItem>
                                <ListGroupItem>Join Date: {currentUser.createdDate ? <TextFormat value={currentUser.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</ListGroupItem>
                                <ListGroupItem>Peppermint Points: </ListGroupItem>
                            </ListGroup>
                            <p>Achievements: Idk put a cute icon or something... maybe put this whole thing in a square in the white space to the left???</p>
                        </Container>
                        </Card>
                    </Col>
                </Row> 
            </Container>
    )
}
export default Profile;