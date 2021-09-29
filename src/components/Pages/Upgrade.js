import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradeFiles/UpgradesFirebase'
import { LookAheadUpgradeCard } from './UpgradeFiles/LookAhead'
import { DropSpeedUpgradeCard } from './UpgradeFiles/DropSpeed'
import { DemolitionChargeUpgradeCard } from './UpgradeFiles/DemolitionCharge'



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
const UpgradeCards = () => {

  return(
    <Container>
      <Grid columns='equal'>

        {/* 1st upgrade card */}
        <Grid.Column>
          <LookAheadUpgradeCard />
        </Grid.Column>

        {/* 2nd upgrade card */}
        <Grid.Column>
          <DropSpeedUpgradeCard />
        </Grid.Column>

        {/* 3rd upgrade card */}
        <Grid.Column>
          <DemolitionChargeUpgradeCard />
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

