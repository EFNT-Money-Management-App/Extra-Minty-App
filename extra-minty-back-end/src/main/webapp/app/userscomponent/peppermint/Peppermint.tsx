import * as React from 'react';
import axios from 'axios';
import './Peppermint.css';
import { useState, useEffect} from 'react';
import { Container, Col, Row } from 'reactstrap';
import { IUser } from 'app/shared/model/user.model';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { IProfile } from 'app/shared/model/profile.model';
import { Progress } from 'reactstrap';

const Peppermint = () => {
    const [currentUser, setCurrentUser] = React.useState<IUser>({})
    const [profileUser, setProfileUser] = useState<IProfile>({})
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<IBankAccount[]>([])

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

    return (
        <div className='full-page'>
            <div className='profile-content'>
                <img src="./content/images/output-onlinepngtools.png" alt="" className="left-header-img" />
                <span className='title'>
                    {currentUser.firstName}'s Peppermints!
                </span>
                <img src="./content/images/flying-coin.png" alt="" className='right-header-img' />
            </div>
            <Container className='center-display'>
              <h2 > Current Peppermints: {loading ? 'Loading....' : (accounts.length > 0 ? getPeppermints(accounts) : 0)}</h2>
            </Container>
            <Container><h3>{2000 - getPeppermints(accounts)} points to next badge!</h3></Container>
            <Container className='center-display'>
           
             <Progress
                    animated
                    className="my-3"
                    min= {0}
                    max= {250000}
                    value={getPeppermints(accounts)}
                    style={{
                        height: '3vh'
                        width: '100%'
                    }}></Progress>
                    <h4>/2000pts</h4>
                    
             </Container>
             <Container className='center-display'>
             
             <div className='highlight'>
             <h5>Tip: Shaving 10% off of your food budget will be a great help in upgrading to earning Penny Pincher!</h5>
            </div>
            </Container>
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
        </div>
    )
}

export default Peppermint;