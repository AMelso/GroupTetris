import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

const PublicForum = () => {
    return (
        <div className="row">
            <div className="col-md-12">
        <div className="row">
            <div className="col-md-12"><h3>Forum</h3></div>
        </div>
        {/* I added bootsnip forums */}
        <div className="clearfix mb30"></div>
    <table className="table table-striped">
        <thead>
            {/* Table header forum */}
          <tr>
            <th>Topic</th>
            <th>Replies</th>
            <th>Last Posted</th>
            <th>Last Comment</th>
            </tr>
          </thead>
          {/* Table forum data from bootsnip and will integrate from firebase */}
          <tbody>
        <tr>
            <td><Link to="/forums/1"> Washington DC</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >1</td>
            <td>9 hours, 1 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: David</td>
        </tr>
        <tr className="active">
            <td><Link to="/forums/1"> NSTP Annual Federal Tax Refresher Course</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >1</td>
            <td>2 hours, 11 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: Honey</td>
        </tr>
        <tr>
            <td><Link to="/forums/1"> Washington DC</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >1</td>
            <td>9 hours, 1 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: David</td>
        </tr>
        <tr className="active">
            <td><Link to="/forums/1"> NSTP Annual Federal Tax Refresher Course</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >21</td>
            <td>2 hours, 11 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: Honey</td>
        </tr>
        <tr>
            <td><Link to="/forums/1"> Washington DC</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >12</td>
            <td>9 hours, 1 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: David</td>
        </tr>
        <tr className="active">
            <td><Link to="/forums/1"> NSTP Annual Federal Tax Refresher Course</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >14</td>
            <td>2 hours, 11 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: Honey</td>
        </tr>
        <tr>
            <td><Link to="/forums/1"> Washington DC</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >10</td>
            <td>9 hours, 1 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: David</td>
        </tr>
        <tr className="active">
            <td><Link to="/forums/1"> NSTP Annual Federal Tax Refresher Course</Link><br/><b><Icon name="user"/> By : Debra Shelby</b><br/><Icon name="calendar alternate"/> 21 Sep, 2021</td>
            <td >9</td>
            <td>2 hours, 11 minute ago</td>
            <td><small>Wow amazing article</small><br/><Icon name="comment"/> By: Honey</td>
        </tr>      
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">
                        {/* bootsnip pagination code */}
                    <ul className="pagination">
                        <li className="page-item">
                            {/* previous arrow */}
                        <Link className="page-link" to="#/" >
                            <span>«</span>
                            <span className="sr-only">Previous</span>
                        </Link>
                        </li>
                        {/* pagination number */}
                        <li className="page-item active"><Link className="page-link" to="/">1</Link></li>
                        <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                        <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                        <li className="page-item">
                            {/* forward arrow */}
                        <Link className="page-link" to="/" >
                            <span >»</span>
                            <span className="sr-only">Next</span>
                        </Link>
                        </li>
                    </ul>
                    </td>
                </tr>
            </tfoot>
      </table>
     </div>
        </div>
    )
}

export default PublicForum
