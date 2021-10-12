import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradeFiles/UpgradesFirebase'
import { LookAheadCard } from './UpgradeFiles/LookAhead'
import { DropSpeedCard } from './UpgradeFiles/DropSpeed'
import { DemolitionChargeCard } from './UpgradeFiles/DemolitionCharge'


// a container < that contains a row < of columns which have individual upgrade card components imported
export const UpgradeCards = () => {

  // Get upgrade levels from database
  // return upgrade cards with level data

  // get user
  const { user } = useAuthState() // Returns user object, can access user.UID from that.

  // establish state to set the level, Levels will be the state int
  const [lookAheadLevel, setlookAheadLevel] = useState(0);
  const [dropSpeedLevel, setdropSpeedLevel] = useState(0);
  const [demolitionChargeLevel, setdemolitionChargeLevel] = useState(0);
  
  // use state to get points available
  const [pointsToSpend, setPointsToSpend] = useState(0);
  
  const negPointsQuickFix = () => {
    if (pointsToSpend < 0) {
      userAvailablePoints()
    }
  }
  
  
  


  // pull in upgrade levels from firebase. GetUpgrades db call from UpgradesFirebase.js
  useEffect(() => {

    // main function to call the database
    const upgradeLevelsImport = async () => {

      
    
      // create variable to store level, calls GetUpgrades
      const upgradeLevels = await GetUpgrades();
    
      // lookAhead upgrade
      if (isNaN(upgradeLevels['lookAhead'])){
        upgradeLevels['lookAhead'] = 0;
        setlookAheadLevel(upgradeLevels['lookAhead'])}
      else{
      setlookAheadLevel(upgradeLevels['lookAhead'])}

      // dropSpeed upgrade
      if (isNaN(upgradeLevels['dropSpeed'])){
        upgradeLevels['dropSpeed'] = 0;
        setdropSpeedLevel(upgradeLevels['dropSpeed'])}
      else{
      setdropSpeedLevel(upgradeLevels['dropSpeed'])}

      // demoCharge upgrade
      if (isNaN(upgradeLevels['demolitionCharge'])){
        upgradeLevels['demolitionCharge'] = 0;
        setdemolitionChargeLevel(upgradeLevels['demolitionCharge'])}
      else{
      setdemolitionChargeLevel(upgradeLevels['demolitionCharge'])}

      
    
      
    }
    // call the function to complete the promise
    upgradeLevelsImport()

  }, [])

  // pull in user points from firebase. GetPoints db call from UpgradesFirebase.js
  const userAvailablePoints = async () => {
    
    const availablePoints = await GetPoints()
    setPointsToSpend(availablePoints)
    negPointsQuickFix()
    
    
  }
  userAvailablePoints()

  // passed down to upgrade cards, upgrade cards call on upgrade
  const updateLevelState = (card, level) => {
    if (card == 'lookAhead') {
      setlookAheadLevel(level)
    } else if (card == 'dropSpeed') {
      setdropSpeedLevel(level)
    } else if (card == 'demolitionCharge') {
      setdemolitionChargeLevel(level)
    }
    //db slower than render, calling upgrade points later in the chain.
    userAvailablePoints()
  }

  // creates header which is setup to be a row of equally divided/spaced parts, pieces may be added to it.
  const UserPointsBar = () => {
    return(
    <Grid columns='equal'>
      <Grid.Column>
        {user?.displayName}
      </Grid.Column>
      {/* column 2 */}
      <Grid.Column width={8}>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{user?.email}</span>
      </Grid.Column>
      {/* column 3 */}
      <Grid.Column>
        Points: {pointsToSpend}
      </Grid.Column>
    </Grid>
    )
  }

  return(
    <>
    
    <UserPointsBar/>
    <Divider section/>
      <Container>
        <Grid centered columns={2}>

          {/* 1st upgrade card */}
          <Grid.Column>
            <LookAheadCard lookAheadLevel={lookAheadLevel} updateLevelState={updateLevelState} pointsToSpend={pointsToSpend}/>
          </Grid.Column>

          {/* 2nd upgrade card */}
          <Grid.Column>
            <DropSpeedCard dropSpeedLevel={dropSpeedLevel} updateLevelState={updateLevelState} pointsToSpend={pointsToSpend}/>
          </Grid.Column>

          {/* 3rd upgrade card */}
          {/* <Grid.Column>
            <DemolitionChargeCard demolitionChargeLevel={demolitionChargeLevel} updateLevelState={updateLevelState} pointsToSpend={pointsToSpend}/>
          </Grid.Column> */}

        </Grid>
      </Container>
    </>
  )
}
