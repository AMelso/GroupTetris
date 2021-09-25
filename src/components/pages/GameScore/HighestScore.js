import React from 'react';
const HighestScore = ({gameScoreList}) => {
    return (
        <div className="row">
        <div className="col-md-12">
            {/* class to setup layout for tetris board for the table layout */}
            <ul className={"tetrisLeaderBoard"}>
              {/* populated scores list dynamically from the state variable */}
              {/* when we connect firebase api data we will just put api data in gameScoreList */}
              {/* Table Layout */}
              <li className="row headers">
                  {/* index number */}
                    <span className="col-md-2">No:</span>
                    <span className="col-md-7">Player Name </span>
                    <span className="col-md-3">Score</span>
              </li>
              {/* searching for highest score variable by index */}
            { gameScoreList.map((score,index)=>
              (
                    <li key={index} className="row">
                        {/* increases by one each time thru loop */}
                        <span className="col-md-2">{index+1}</span>
                        {/* player name */}
                        <span className="col-md-7">{score.name}</span>
                        {/* score value */}
                        <span className="col-md-3">{score.score}</span>
                    </li>
              ))}
            </ul>
          </div>
    </div>
    )
};

export default HighestScore;
