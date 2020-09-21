import React from 'react';

import UserLogin from './UserLogin';
import SellerLogin from './SellerLogin';


const Login = () => {

    return (
        <div class="container login-container">
            <h3 class="font-weight-light text-center mt-4" >Welcome back to </h3>
            <h3 class="text-center"><strong><i>Yours Locally.</i></strong></h3>
            <p class="lead font-weight-light text-center">Please login as a user or seller, and we will be with you shortly</p>
            <div class="row">
                <UserLogin />
                <SellerLogin />
            </div>
        </div>
    )

}

export default Login