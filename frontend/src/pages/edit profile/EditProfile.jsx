import React, { useState } from "react";
import Style from "./AuthStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";


const EditProfile = () => {

  const [error, setError] = useState(null);
  const { user ,dispatch,toggleNavItems} = useAuthContext();

  const logOut = () => {
    localStorage.removeItem('vh_user');
    dispatch({type: 'LOGOUT'});
    toggleNavItems(false);
    navigate('/');
}
  

  //const user = JSON.parse(localStorage.getItem('vh_user'));
  const logUser = user.userData;
  console.log(logUser);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      let response = await axios.post(
        "http://localhost:8080/profile/editProfile",
        {
          firstName: e.target.firstName.value,
          lastName: e.target.secondName.value,
          email: e.target.email.value,
          newPassword:e.target.Newpassword.value,
          oldPassword: e.target.Oldpassword.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : JSON.parse(localStorage.getItem('vh_user')).token
          },
        }
      );
  
      
  
      let user = await response.data;
      console.log(user);

      logOut();

      navigate('/login');
    }catch(err){
      setError(err);
    }
     

  };
  return (
    <div className={Style.Auth_form_container}>
      <form className={Style.Auth_form} onSubmit={handleSubmit}>
        <div className={Style.Auth_form_content}>
          <h3 className={Style.Auth_form_title}>Edit Profile</h3>

          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control mt-1"
              placeholder="Update FirstName"
              id="validationDefault02"
            />
          </div>

          <div className="form-group mt-3">
            <label>Second Name</label>
            <input
              type="text"
              name="secondName"
              className="form-control mt-1"
              placeholder="Update SecondName"
            />
          </div>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Update email"
            />
          </div>

          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="New password"
              name="Newpassword"
            />
          </div>

          <div className="form-group mt-3">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Old password"
              name="Oldpassword"
              required
            />
          </div>
          
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Update 
            </button>
            
            {error && <div className="alert alert-danger" role="alert">
                            {error.response.data}
                       </div>
            }
          </div>
          <p
            className="forgot-password text-center mt-2"
            style={{ paddingTop: "10px" }}
          >
            {/* <b>
              <a href="/login">login?</a>
            </b> */}
          </p>
        </div>
      </form>
      
    </div>
  );
}

export default EditProfile;
