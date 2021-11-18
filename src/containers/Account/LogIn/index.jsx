import React from "react";
import PropTypes from "prop-types";
import withAuthFirebase from "../../../shared/components/auth/withAuthFirebase";
import LogInForm from "../../../shared/components/loginForm/LogInForm";
import Logo from "../../../shared/img/logo/logo_itl.svg";

const LogIn = ({ changeIsOpenModalFireBase }) => {
  
  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to
              <span className="account__logo"> 
                <img className="img-fluid ml-2" src={Logo} alt="ITL" style={{width: "50px"}}/>
              </span>
            </h3> 
          </div>
          <LogInForm onSubmit form="log_in_form" /> 
         
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LogIn);
