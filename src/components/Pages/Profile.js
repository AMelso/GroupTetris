import React,{useState,useCallback} from 'react'
import { useAuthState } from '../../firebase';
import {  updateProfile,updateEmail } from 'firebase/auth'
import SidebarNav from './SidebarNav'
const ProfilePage = () => {
    //setting up error messages
    //fnError equals first name error
    //lnError equals is false
    //emailError is false
    let defaultError = {fnError:false,lnError:false, emailError:false};
    const[error,setError] = useState(defaultError);
    //getting current user who is logged in
    const { user } = useAuthState();
    //display firstname, lastname, email on form
    let defaultFormData = {fName:user.displayName,lName:'',email:user.email};
    //default form data put in state
    const[formData,setFormData] = useState(defaultFormData);
    //when click on submit to update profile it is calling useCallback function
    const handleSubmit = useCallback( async e => {
        //parameter for useCallback function 
        //if firstname on form is blank then value false ortherwise it is true
        defaultError.fnError = formData.fName === "" ? true : false;
        //if email on form is blank than it is false otherwise it is true
        defaultError.emailError = formData.email === "" ? true : false;
        //putting setError in State
        setError(defaultError);

        //if getting error for firstname or email then it will never  advance to try/catch
        if(defaultError.fnError === true ||  defaultError.emailError === true){
            return false;
        }
        try{
            //updating the username and email using standard or prebuilt mehtod by firebase package library
            //if correct information entered on form then user can enter name and email 
            await updateProfile(user,{displayName:formData.fName,email:formData.email});
            //alllows user to update email
            await updateEmail(user,formData.email);
            //if email is updated then success message generated
            alert("successfully updated your profile");
            //once profile info is updated then alert message "successfully updated profile"
        }catch(e){
            alert(e.message);
        }
        //It's dependecy variable for useCallback function in 'const handle submit'
        },[formData,error]);
    return (
        <>
        {/* code from bootsnip UserProfile 2 */}
            <div className="row">
                <SidebarNav/> 
            <div className="col-md-9">
		    <div className="card">
		        <div className="card-body">
		            <div className="row">
		                <div className="col-md-12">
		                    <h4>Your Profile</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
                            <div className="form-group row">
                                <label className="col-4 col-form-label">Display  Name*</label> 
                                <div className="col-8">
                                    <input  placeholder="First Name" value={formData.fName} onChange={(e)=>{setFormData({...formData,fName:e.target.value})}} className="form-control here"  type="text"/>
                                    {error.fnError && <p className="error">Please fill first name</p>}
                                </div>
                              </div>

                              <div className="form-group row">
                                <label className="col-4 col-form-label">Email*</label> 
                                <div className="col-8">
                                    <input  placeholder="Email" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}} className="form-control"  type="text"/>
                                    {error.emailError && <p className="error">Please fill email</p>}
                                </div>
                              </div> 
                              <div className="form-group row">
                                <div className="offset-4 col-8">
                                  <button name="submit" type="submit" onClick={handleSubmit} className="btn btn-primary">Update Profile</button>
                                </div>
                              </div>
                         </div>
                         </div>
            </div>
            </div>
            </div>    
            </div>
        </>
    )
}

export default ProfilePage