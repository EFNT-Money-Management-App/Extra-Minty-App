import * as React from 'react';
import './Profile.css';
import { Card, Button, FormGroup, Input, ListGroup, ListGroupItem, Col, Container, Row, Tooltip } from 'reactstrap';
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
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';
import { IBankAccount } from 'app/shared/model/bank-account.model';



const Profile = () => {
    const [currentUser, setCurrentUser] = useState<IUser>({})
    const [profileUser, setProfileUser] = useState<IProfile>({})
    const [accounts, setAccounts] = useState<IBankAccount[]>([])
    const [isNew, setIsNew] = useState(true)
    const [hover, setHover] = useState(false)

    const handleMouseOver = () => {
      setHover (true)
    }
    const handleMouseOut = () => {
      setHover (false)
    }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios.get('/api/bank-accounts/currentUser').then((res) => {
        setAccounts(res.data);
        setLoading(false);
      });
    }, []);

    useEffect(() =>{
        axios.get('/api/account')
        .then(res => {
            setCurrentUser(res.data)
        })
        axios.get('api/profiles/current-user').then(res => {
          setProfileUser(res.data);
          setIsNew(res.data.birthdate === null || res.data.birthdate === undefined)
        });
        axios.get('/api/bank-accounts/currentUser').then(res => {
          setAccounts(res.data);
        })
    },[])

    const getPeppermints = (accounts: IBankAccount[]): number => {
      // let savings = accounts.filter(account => account.type === 'SAVINGS').map(account => account.balance)
      // return savings.reduce((sum, current) => sum + current.balance, 0)
      return accounts.filter(account => account.type === 'SAVINGS')
      .reduce((sum, current) => sum + current.balance, 0);
    }

    // useEffect(() => {
    //     axios.get(`/api/profiles/${currentUser.id}`)
    //     .then(response => {
    //         console.log(response.data)
    //         setProfileUser(response.data)
    //     })
    //     .catch((error) => console.log(error))
    // }, [])

    return (
      <Container fluid="m" className="profile-content">
        <Row>
          <Col sm={{ size: '4' }} className="left-column">
            <Container className="bottom-left-card">
              <Container className="title">Your Achievements</Container>
              <tr>
                <td>
                  <div className="toolpit">
                    <img src="./content/images/candy.png" alt="" className="icon-styling" />
                    <span className="tooltiptext">Your first Peppermint!</span>
                  </div>
                </td>
                <td>
                  <div className="toolpit">
                    <img src="./content/images/money-bag.png" alt="" className="icon-styling" />
                    <span className="tooltiptext">Securing the bag!</span>
                  </div>
                </td>
                <td>
                  <div className="toolpit">
                    <img src="./content/images/dollars.png" alt="" className="icon-styling" />
                    <span className="tooltiptext">Bills bills bills!</span>
                  </div>
                </td>
                <td>
                  <div className="toolpit">
                    <img src="./content/images/mint.png" alt="" className="icon-styling" />
                    <span className="tooltiptext">Getting minty!</span>
                  </div>
                </td>
              </tr>
            </Container>
          </Col>
          <Col className="right-column" l={{ offset: 1, size: 'auto' }}>
            <Container className="details-card">
              <Container className="title">{currentUser.login}'s Profile</Container>
              <Container className="user-info">
                <div className="user-title">
                  <div className="profile-picture">
                    {profileUser && profileUser.profilePicture ? (
                      <span>
                        {' '}
                        <img
                          className="profile-picture"
                          src={`data:${[profileUser.profilePicture]};base64,${profileUser.profilePicture}`}
                        />{' '}
                      </span>
                    ) : (
                      <span>
                        <img className="profile-picture" src="../content/images/generic-user.png" alt="" />
                      </span>
                    )}
                    {/* <img className="picture" src="../content/images/profile-pic.jpeg" alt="User Image"/> */}
                  </div>
                </div>
                <Container className="title">Your Details</Container>
                <ListGroup className="list">
                  {currentUser && profileUser ? (
                    <div>
                      <div className="details-border">
                        <ListGroupItem className="form">{'Username: ' + currentUser.login}</ListGroupItem>
                        <ListGroupItem>{'First Name: ' + currentUser.firstName}</ListGroupItem>
                        <ListGroupItem>{'Last Name: ' + currentUser.lastName}</ListGroupItem>
                        <ListGroupItem>{'Email: ' + currentUser.email}</ListGroupItem>
                        <ListGroupItem>{'Date of Birth: ' + profileUser.birthdate}</ListGroupItem>
                        <ListGroupItem>
                          Join Date:{' '}
                          {currentUser.createdDate ? (
                            <TextFormat value={currentUser.createdDate} type="date" format={APP_DATE_FORMAT} />
                          ) : null}
                        </ListGroupItem>
                        <ListGroupItem>Peppermint Points: {loading ? 'Loading....' : (accounts.length > 0 ? getPeppermints(accounts) : 0)}</ListGroupItem>
                      </div>
                      <a href={isNew ? `profile/new` : `profile/${profileUser.id}/edit`}>
                        <Button className="apply-button">Add birthdate & profile image</Button>
                      </a>
                    </div>
                  ) : (
                    'Error: User not Found.'
                  )}
                </ListGroup>
              </Container>
            </Container>
          </Col>
        </Row>
      </Container>
    );
}
export default Profile;

// function useAppSelector(arg0: (state: any) => any) {
//   throw new Error('Function not implemented.');
// }


{/* <Container className="menu">
              <ListGroup className="list">
                <Container className="title">Account Settings</Container>
                <FormGroup>
                  <Input placeholder="Update Username" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Update First Name" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Update Last Name" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Update Email" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Update Password" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Re-Enter New Password" type="text" />
                  <Button className="apply-button"> Apply Changes</Button>
                </FormGroup>
              </ListGroup>
            </Container> */}