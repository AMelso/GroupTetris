import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradeFiles/UpgradesFirebase'
import { LookAheadCard } from './UpgradeFiles/LookAhead'
import { DropSpeedCard } from './UpgradeFiles/DropSpeed'
import { DemolitionChargeCard } from './UpgradeFiles/DemolitionCharge'



// creates header which is setup to be a row of equally divided/spaced parts, pieces may be added to it.
const UpgradeHeader = () => {

  const { user } = useAuthState() // Returns user object, can access user.UID from that.

  const [pointsToSpend, setPointsToSpend] = useState(0);

  // FOR TESTING PURPOSES
  // useEffect(() => {
  //   const test = async () => {
  //     const points = await GetPoints()
  //     console.log('POINTS: ', points)
  //     await SpendPoints(100)
  //     await SaveUpgrade('dropSpeed', 1)
  //     const upgrades = await GetUpgrades()
  //     console.log('UPGRADES: ', upgrades)
  //   }
  //   test()
  // }, [])
  // END TESTING


  // pull in user points from firebase. GetPoints db call from UpgradesFirebase.js
  useEffect(() => {
    const userAvailablePoints = async () => {
    
      const availablePoints = await GetPoints()
      setPointsToSpend(availablePoints)
      
    }
    userAvailablePoints()
    
  }, [])

  

  return(
    <Grid columns='equal'>
      {/* column 1 */}
      <Grid.Column width={8}>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{user?.email}</span>
      </Grid.Column>
      {/* column 2 */}
      <Grid.Column>
        Points: {pointsToSpend}
      </Grid.Column>
    </Grid>
  )
}

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


  // pull in upgrade levels from firebase. GetUpgrades db call from UpgradesFirebase.js
  useEffect(() => {

    // main function to call the database
    const upgradeLevelsImport = async () => {
    
      // create variable to store level, calls GetUpgrades
      const upgradeLevels = await GetUpgrades();
    
      // lookAhead upgrade

      // if the user doesn't have the data in the database, set to level 0
      if (upgradeLevels['lookAhead'] === undefined) {
        setlookAheadLevel(0)
        // if it exists, set the level in state to the value from the db.
      } else {
        setlookAheadLevel(upgradeLevels['lookAhead'])
      }

      // dropSpeed upgrade
      
      // if the user doesn't have the data in the database, set to level 0
      if (upgradeLevels['dropSpeed'] === undefined) {
        setdropSpeedLevel(0)
        // if it exists, set the level in state to the value from the db.
      } else {
        setdropSpeedLevel(upgradeLevels['dropSpeed'])
      }

      // demolitionCharge upgrade
      
      // if the user doesn't have the data in the database, set to level 0
      if (upgradeLevels['demolitionCharge'] === undefined) {
        setdemolitionChargeLevel(0)
        // if it exists, set the level in state to the value from the db.
      } else {
        setdemolitionChargeLevel(upgradeLevels['demolitionCharge'])
      }
    }
    // call the function to complete the promise
    upgradeLevelsImport()

  }, [])

  const updateLevelState = (card, level) => {
    if (card == 'lookAhead') {
      setlookAheadLevel(level)
    }
  }

  return(
    <Container>
      <Grid columns='equal'>

        {/* 1st upgrade card */}
        <Grid.Column>
          <LookAheadCard lookAheadLevel={lookAheadLevel} updateLevelState={updateLevelState}/>
        </Grid.Column>

        {/* 2nd upgrade card */}
        <Grid.Column>
          <DropSpeedCard dropSpeedLevel={dropSpeedLevel}/>
        </Grid.Column>

        {/* 3rd upgrade card */}
        <Grid.Column>
          <DemolitionChargeCard demolitionChargeLevel={demolitionChargeLevel}/>
        </Grid.Column>

      </Grid>
    </Container>
  )
}



export const Upgrade = () => {
  
  return (
    <>
      {UpgradeHeader()}
      <Divider section />
      {UpgradeCards()}
    </>
  )
}

