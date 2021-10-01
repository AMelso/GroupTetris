import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'



export const LookAheadCard = (props) => {


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
    var upgradeToLevel = (1 + props.lookAheadLevel)
    // set UpgradeCost to upgrade level cost in upgradeToLevel object of level:cost
    // then render upgrade button.
    var UpgradeCost = upgradeToLevelCost[upgradeToLevel]
    var upgradeButton = 
    <div className='button'>
      <Button as='div' labelPosition='left'>
        <Label basic pointing='right'>
          {/* // pass in next level */}
          Upgrade: {upgradeToLevel}
        </Label>
        <Button icon>
          <Icon name='arrow alternate circle up outline' />
          {/* // pass in upgrade cost */}
          {UpgradeCost}
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
        <Card.Description>
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
