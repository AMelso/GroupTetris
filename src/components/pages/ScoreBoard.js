import React from 'react'
import SidebarNav from './SidebarNav'

const ScoreBoard = () => {
    return (
      // bootsnip scoreboard scoretabe 4
        <div className="row">
            <SidebarNav/>
            <div className="col-md-9">
    <div className="row mb-1">
        <div className="col-md-12 text-center">
            <h1>Score Tables</h1>
            <p>This is a basic last get score board</p>
        </div>
    </div>
    <div className="row justify-content-md-center mb-4">
        <div className="col-md-10">
            
         
            <div className="widget">
        
              <div className="mb-3 text-center">
                <h4>
                  <span>Score</span>
                </h4>
              </div>
             
              <table className="table small mb-5">
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration(Min.)</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-success text-white">
                    <th scope="row">1</th>
                    <td>11-02-2021</td>
                    <td>20Min</td>
                    <td>75</td>
                  
                  </tr>
                  <tr className="bg-secondarytext-white">
                    <th scope="row">2</th>
                    <td>11-02-2021</td>
                    <td>30Min</td>
                    <td>50</td>
                    
                  </tr>
                  <tr className="bg-warning text-white">
                    <th scope="row">3</th>
                    <td>11-02-2021</td>
                    <td>50Min</td>
                    <td>35</td>
                    </tr>
                  <tr className="bg-danger text-white">
                    <th scope="row">4</th>
                    <td>11-02-2021</td>
                    <td>30 Min</td>
                    <td>10</td>
                     </tr>
                </tbody>
              </table>
              <div className="gap-0"></div>
            </div>
        	
        	
        </div>
    </div>
	
	<div className="row mb-4">
        <div className="col-12 text-center">
            <p>Design by Ari Budin <a target="_blank" href="https://bootstrap.news/bootstrap-4-template-news-portal-magazine/">Bootstrap.News</a></p>
        </div>
    </div>
</div>
</div>
    )
}

export default ScoreBoard
