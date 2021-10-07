import React from 'react'

const MyScore = ({gameScoreList}) => {
    return (
        <div className="row">
        <div className="col-md-12">
            {/* creating a Table using className Tetris */}
            {/* Table below and represnts table in code of "My highest games" */}
            <ul className={"tetrisLeaderBoard"}>
              {/* populated scores list dynamically from the state variable */}
              {/* when we connect firebase api data we will just put api data in gameScoreList */}
              <li className="row headers">
                    <span className="col-md-2">No:</span>
                    <span className="col-md-7"></span>
                    <span className="col-md-3">Score</span>
              </li>
              {/* loops thru scores by index retries index, date, score */}
            { gameScoreList.map((score,index)=>
              (
                    <li key={index} className="row">
                        <span className="col-md-2">{index+1}</span>
                        <span className="col-md-7"></span>
                        <span className="col-md-3">{score.score}</span>
                    </li>
              ))}
            </ul>
          </div>
    </div>
    )
};

export default MyScore