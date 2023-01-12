import * as React from 'react';
import './Profile.css';
import { Card } from 'reactstrap';
const Profile = () => {
    return (
        <div>
            <h2> User Profile</h2>
            <div className='user'>
                <span className='user-image'><img src="../content/images/jhipster_family_member_0_head-192.png" alt="" /></span>
                <span className='user-name' >User1</span>
            </div>
            <div>
               <Card>
                <div  className='user-info'>
                    <table>
                    </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default Profile;