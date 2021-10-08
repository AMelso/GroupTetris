import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'
import {UpgradeCards} from '../Upgrade'
import crystalBall from '../../../img/crystal_ball.jpeg'



export const LookAheadCard = (props) => {

  
  let upgradeName = "lookAhead";


  const UpgradeClick = () => {
    SaveUpgrade(upgradeName,level,cost)
    props.updateLevelState(upgradeName, level)
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
  
  var level = (1 + props.lookAheadLevel)
  var cost = parseInt(upgradeToLevelCost[level])
  var points = parseInt(props.pointsToSpend)
  var short = cost - points

  if (level > 5) {
    var upgradeButton = 
      "Max Level"
  } else if (cost > points){
    var upgradeButton = 
    <div className='button'>
      <Button as='div' labelPosition='left'>
        <Label basic pointing='right'>
          {/* // pass in next level */}
          Upgrade: {level}: Requires {short} more.
        </Label>
      </Button>
    </div>
  } else {
      // set UpgradeCost to upgrade level cost in upgradeToLevel object of level:cost
      // then render upgrade button.
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
      <Image src={crystalBall} alt="Crystal Ball" height="232px" />
      <Card.Content>
        <Card.Header>Fore Sight</Card.Header>
        <Card.Meta>
        {/* call function to grab int level */}
          <span className='level'>Current level: {props.lookAheadLevel}</span> 
        </Card.Meta>
        <Card.Description >
        <p>
          <br />
        Each upgrade grants 1 additional future piece to be seen.
          <br />
          <br />
        </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      {/* button conditionally rendered in upgrade cost logic */}
      {upgradeButton}
      </Card.Content>
    </Card>
  )
}
