import React,{useState} from 'react'
import SidebarNav from './SidebarNav'
import { Icon } from 'semantic-ui-react'
const LeaderBoard = () => {
  //set up score manually for now in const default Score List
  const defaultScores = [
  {score:100,title:"Tetris Game Score"},
  {score:80,title:"Tetris Game Score"},
  {score:70,title:"Tetris Game Score"},
  {score:25,title:"Tetris Game Score"},
  {score:10,title:"Tetris Game Score"}

]
//when we will integrate firebase Api we ill use setGameScoreList function to propagate API
  const[gameScoreList,setGameScoreList] = useState(defaultScores);
  //we will connect firebase api here using useEffect and save api data response in setGameScoreList
    return (
      
        <div className="row">
            <SidebarNav/>
            <div className="col-md-9">
          <div className="row mb-1">
              <div className="col-md-12 text-center">
                  <h1>Leader Board</h1>
                </div>
          </div>
    <div className="row justify-content-md-center mb-4">
        <div className="col-md-10">
            <ul className={"tetrisLeaderBoard"}>
              {/* populated scores list dynamically from the state variable */}
              {/* when we connect firebase api data we will just put api data in gameScoreList */}
            { gameScoreList.map((score,index)=>
              (
                    <li key={index} 
                      className={ index === 0  ? "row bg-success text-white" : 
                      (index === 1 ? "row bg-warning text-white":(index === 2 ? "row bg-danger text-white":"row") )}
                      >
                        <span className="col-md-1"><label>{index+1}</label></span>
                        <span className="col-md-10">{score.score}<br/>{score.title}</span>
                        <span className="col-md-1"><Icon name='gamepad'/></span>
                    </li>
              ))}
            </ul>
          </div>
    </div>
	
</div>
</div>
    )
}

export default LeaderBoard
