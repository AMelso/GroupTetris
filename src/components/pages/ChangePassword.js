import React from 'react'
import SidebarNav from './SidebarNav'

const ChangePassword = () => {
    return (
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
                            <div className="form-group row">
                                <label className="col-4 col-form-label">Password</label> 
                                <div className="col-8">
                                    <input  placeholder="Password" className="form-control here"  type="password"/>
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-4 col-form-label">Confirm Password</label> 
                                <div className="col-8">
                                    <input  placeholder="Confirm Password" className="form-control"  type="password"/>
                                </div>
                              </div> 
 
                              <div className="form-group row">
                                <div className="offset-4 col-8">
                                  <button name="submit" type="submit" className="btn btn-primary">Update Password</button>
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
