import React,{useState} from 'react'
import SidebarNav from './SidebarNav'

const AddForum = () => {
    const[formData,setFormData] = useState({title:'',description:''});
    const handleSubmit = ()=>{

    }
    return (
        <div className="row">
            <SidebarNav />
            <div className="col-md-9">
		    <div className="card">
		        <div className="card-body">
		            <div className="row">
		                <div className="col-md-12">
		                    <h4>Add New Forum</h4>
		                    <hr/>
		                </div>
		            </div>
		            <div className="row">
		                <div className="col-md-12">
                                <div className="form-group row">
                                <label className="col-4 col-form-label">Title</label> 
                                <div className="col-8">
                                    <input  placeholder="Title" className="form-control here" type="text" 
                                    onChange={(e)=>{setFormData({...formData,title:e.target.value})}}
                                    value={formData.title}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-4 col-form-label">Description</label> 
                                <div className="col-8">
                                    <textarea  onChange={(e)=>{setFormData({...formData,description:e.target.value})}} placeholder="Description" className="form-control" >{formData.description}</textarea>
                                </div>
                            </div> 

                            <div className="form-group row">
                                <div className="offset-4 col-8">
                                <button name="submit" type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
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

export default AddForum
