import React,{useState} from 'react'
import SidebarNav from './SidebarNav'
import { Icon } from 'semantic-ui-react'
import HighestScore from './GameScore/HighestScore'
import TotalScore from './GameScore/TotalScore'
import MyScore from './GameScore/MyScore'
const LeaderBoard = () => {
  //set up score manually for now in const default Score List
  //refers to "highest game score tab in the code"
  const defaultScores = [
  {score:100,name:"Debra"},
  {score:80,name:"Bob"},
  {score:70,name:"John"},
  {score:25,name:"Jeny"},
  {score:10,name:"Krish"}
]
//when we will integrate firebase Api we ill use setGameScoreList function to propagate API
  const[highestScoreList] = useState(defaultScores);
  // refers to 'My highest games tab in the code"
  const[myScoreList] =useState([{date:'2021-09-09 11:02:22',score:130},{date:'2021-09-10 01:02:22',score:120},{date:'2021-09-011 12:02:22',score:50}]);
  //refers to "Total score tab in the code"
  const[totalScoreList] =  useState([{name:'Mike',score:50},{name:'Herry',score:80},{name:'Debra',score:100},{name:'David',score:90}]);
  // change step for tab related to className={activeStep}
  const[activeStep,setStep] = useState(0);
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
          <div className="row">
			<div className="col-md-12">
				<nav className="sidebarnav">
					<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
						<a className={activeStep === 0 ? "nav-item nav-link active": "nav-item nav-link" } onClick={(e)=>{e.preventDefault(); setStep(0);}} href="/">Total Score</a>
						<a  className={activeStep === 1 ? "nav-item nav-link active": "nav-item nav-link" } onClick={(e)=>{e.preventDefault(); setStep(1);}} href="/">Highest games</a>
						<a className={activeStep === 2 ? "nav-item nav-link active": "nav-item nav-link" } onClick={(e)=>{e.preventDefault(); setStep(2);}} href="/">My highest games</a>
					</div>
				</nav>
				<div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
					<div className={activeStep === 0 ? "tab-pane fade show active" : "tab-pane fade"}>
                <TotalScore gameScoreList={totalScoreList}/>
					</div>
					<div className={activeStep === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
            <HighestScore gameScoreList={highestScoreList}/>
					</div>
					<div className={activeStep === 2 ? "tab-pane fade show active" : "tab-pane fade"}>
            <MyScore gameScoreList={myScoreList}/>
					</div>
				</div>
			
			</div>
		</div>
  
</div>
</div>
    )
}

export default LeaderBoard
