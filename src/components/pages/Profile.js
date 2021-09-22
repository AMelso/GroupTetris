import React from 'react'
import SidebarNav from './SidebarNav'
const ProfilePage = () => {
    
    return (
        <>
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
                                <label className="col-4 col-form-label">First  Name*</label> 
                                <div className="col-8">
                                    <input  placeholder="First Name" className="form-control here"  type="text"/>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Last  Name*</label> 
                                <div className="col-8">
                                    <input  placeholder="Last Name" className="form-control"  type="text"/>
                                </div>
                              </div> 
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Email*</label> 
                                <div className="col-8">
                                    <input  placeholder="Email" className="form-control"  type="text"/>
                                </div>
                              </div> 
                              <div className="form-group row">
                                <div className="offset-4 col-8">
                                  <button name="submit" type="submit" className="btn btn-primary">Update Profile</button>
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
