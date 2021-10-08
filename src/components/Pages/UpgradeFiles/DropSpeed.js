import React, { useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid} from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'
import timeDilation from '../../../img/timeDilation.jpeg'



export const DropSpeedCard = (props) => {

  let upgradeName = "dropSpeed";


  const UpgradeClick = () => {
    SaveUpgrade(upgradeName,level,cost)
    props.updateLevelState(upgradeName, level)
  }

  //UPGRADE COST LOGIC
  // object of upgrade cost
  const upgradeToLevelCost = {
    "1":200,
    "2":400,
    "3":600,
    "4":800,
    "5":1000,
    "6":1200,
    "7":1400,
    "8":1600,
    "9":1800,
    "10":2000,
  }

  // assign to a variable, which adds 1 to the current level from props
  // if current level is 5, set upgradeToLevel as 6, over max, cant do, handled below
  
  var level = (1 + props.dropSpeedLevel)
  var cost = parseInt(upgradeToLevelCost[level])
  var points = parseInt(props.pointsToSpend)
  var short = cost - points

  if (level > 10) {
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
      <Image src={timeDilation} alt="Time Dilation" height="232px"/>
      <Card.Content>
        <Card.Header>Time Dilation</Card.Header>
        <Card.Meta>
          <span className='level'>Current level: {props.dropSpeedLevel}</span>
        </Card.Meta>
        <Card.Description height="100px">
          <p>
          <br />
          Each upgrade distorts time, causing tetramino's to fall to earth slower.
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
