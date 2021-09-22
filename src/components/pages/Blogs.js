import React from 'react'
import SidebarNav from './SidebarNav'

const Blogs = () => {
    return (
        <div className="row">
            <SidebarNav/>

<div className="col-md-9">
    <div className="row">
        <div className="col-md-2">
        <img className="media-object" src="http://placekitten.com/150/150" alt=""/>
        </div>
        <div className="col-md-10">

    <h1>Alice in Wonderland, part dos</h1>
    <p>'You ought to be ashamed of yourself for asking such a simple question,' added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!' and he went on in these words:
    'Yes, we went to school in the sea, though you mayn't believe it—'
    'I never said I didn't!' interrupted Alice.
    'You did,' said the Mock Turtle.</p>
    <div>
        <span className="badge badge-success">Edit</span> &nbsp;
        <span className="badge badge-danger">Delete</span>
    </div> 
    <hr/>
    
    </div>
    </div>
</div>
        </div>
    )
}

export default Blogs
