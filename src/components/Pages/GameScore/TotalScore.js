import React from 'react'

const TotalScore = ({gameScoreList}) => {
    return (
        <div className="row">
        <div className="col-md-12">
            <ul className={"tetrisLeaderBoard"}>
              {/* populated scores list dynamically from the state variable */}
              {/* when we connect firebase api data we will just put api data in gameScoreList */}
              <li className="row headers">
                    <span className="col-md-2">No:</span>
                    <span className="col-md-7">Player Name </span>
                    <span className="col-md-3">Score</span>
              </li>
            { gameScoreList.map((score,index)=>
              (
                    <li key={index} className="row">
                        <span className="col-md-2">{index+1}</span>
                        <span className="col-md-7">{score.name}</span>
                        <span className="col-md-3">{score.score}</span>
                    </li>
              ))}
            </ul>
          </div>
    </div>
    )
};


export default TotalScore