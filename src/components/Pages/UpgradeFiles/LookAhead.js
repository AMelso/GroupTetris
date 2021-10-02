import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'
import {UpgradeCards} from '../Upgrade'



export const LookAheadCard = (props) => {

  
  let upgradeName = "lookAhead";


  const UpgradeClick = () => {
    SaveUpgrade(upgradeName,level,cost)
    UpgradeCards()
  }

  //UPGRADE COST LOGIC
  // object of upgrade cost
  const upgradeToLevelCost = {
    "1":500,
    "2":1000,
    "3":2000,
    "4":3000,
    "5":4000
  }

  // assign to a variable, which adds 1 to the current level from props
  // if current level is 5, set upgradeToLevel as 6, over max, cant do, handled below
  if (props.lookAheadLevel >= 5) {
    var upgradeButton = 
      "Max Level"
  } else {
    var level = (1 + props.lookAheadLevel)
    // set cost to upgrade level cost in level object of level:cost
    // then render upgrade button.
    var cost = upgradeToLevelCost[level]
    var upgradeButton = 
    <div className='button'>
      <Button as='div' labelPosition='left'>
        <Label basic pointing='right'>
          {/* // pass in next level */}
          Upgrade: {level}
        </Label>
        <Button icon onClick={UpgradeClick}>
          <Icon name='arrow alternate circle up outline' />
          {/* // pass in upgrade cost */}
          {cost}
        </Button>
      </Button>
    </div>
  }
    //////// End upgrade Cost logic

  return(
    <Card>
      <Image src="https://www.pikpng.com/pngl/m/576-5768393_transparent-clipart-crystal-ball-png-download.png" />
      <Card.Content>
        <Card.Header>Fore Sight</Card.Header>
        <Card.Meta>
        {/* call function to grab int level */}
          <span className='level'>Current level: {props.lookAheadLevel}</span> 
        </Card.Meta>
        <Card.Description >
        Each upgrade grants 1 additional future piece to be seen.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      {/* button conditionally rendered in upgrade cost logic */}
      {upgradeButton}
      </Card.Content>
    </Card>
  )
}
