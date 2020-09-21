import React from 'react';
import RegisterUser from './RegisterUser';
import RegisterSeller from './RegisterSeller';


const Register = () => {

    return (
        <div class="container login-container">
            <h3 class="font-weight-light text-center mt-4" >Thank you for choosing </h3>
            <h3 class="text-center"><strong><i>Yours Locally.</i></strong></h3>
            <p class="lead font-weight-light text-center">Please choose whether to register as a user or seller</p>
            <div class="row">
                <RegisterUser />
                <RegisterSeller />
            </div>
        </div>
    )

}

export default Register