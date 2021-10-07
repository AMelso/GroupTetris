import React,{useState,useCallback,useMemo} from 'react'
import SidebarNav from './SidebarNav'
import {  updatePassword } from 'firebase/auth'
import { useAuthState } from '../../firebase'
const ChangePassword = () => {
    const { user } = useAuthState()
    // set all errors by default as blank or false

    let defaultError = {errorPass:false,errorcPass:false};
    //state variable of error and function setError on UI
    
    //show error message on browser
    const[error,setError]= useState(defaultError);
    // cpassword equals confirmed password
    const[formData,setFormData]= useState({password:'',cpassword:''});
    const handleSubmit = useCallback(async e => {

        if(formData.password === "" || formData.cpassword === ""){
            //if password and confirmend password are blank then show red
            //error below form "please fill requrired field"
            //
            setError({...error,errorPass:true});
            return false;
            // if passwords don't match then alert is "passwords should be the same"
        }else if(formData.password !== formData.cpassword){
            //if both passwords are the same then response is true
            //and then shows error message below the form that passwords are the same
            defaultError.errorcPass = true;
            // it's setup the state back again with the error message true
            setError(defaultError);
            return false;
        }
        //if all are correct then we are showing all error messages again false
        setError(defaultError);
        try {
            // handling error if get error from firebase
            await updatePassword(user,formData.password) // update password
            // alert message that we get from firebase
            alert("Successfully updated password");
          } catch (e) {
            //   if we get error then alert message like "weak password"
            alert(e.message)
          }
        }, [formData,defaultError,error,user])//object passing data into

    return (
        // bootsnip code from #2 User Profile
        <div className="row">
            <SidebarNav/>
            <div className="col-md-9">
		    <div className="card">
		        <div className="card-body">
		            <div className="row">
		                <div className="col-md-12">
		                    <h4>Profile Password</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
                        {/* purpose of form is to change and update password */}
                            <div className="form-group row">
                                <label className="col-4 col-form-label">New Password</label> 
                                <div className="col-8">
                                    <input  placeholder="Password" className="form-control here" onChange={(e)=>{
                                        // value of the variable for change password placed in password:e.target.value or useState
                                        //storing the value in useState and using this password for change password and
                                        //ths is referrred to password in useState

                                        setFormData({...formData,password:e.target.value})
                                    }}  type="password"/>

                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Confirm Password</label> 
                                <div className="col-8">
                                    <input  placeholder="Confirm Password" className="form-control" onChange={(e)=>{
                                        setFormData({...formData,cpassword:e.target.value})
                                    }}  type="password"/>

                                </div>
                              </div> 

                              <div className="form-group row">
                                <div className="offset-4 col-8">
                                    {/* if true then fill input value of "Please fill required field"*/}
                                {error.errorPass && <p className='error'>Please fill required field</p>}   
                                {/* if both are password and confirmed password not same then message below of "Pasworrd should be same" */}
                              {error.errorcPass && <p className='error'>Password should be same</p>}
                                  <button name="submit" type="submit" onClick={handleSubmit} className="btn btn-primary">Update Password</button>
                                </div>
                              </div>
                         </div>
                         </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default ChangePassword