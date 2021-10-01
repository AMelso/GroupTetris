import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'



export const DropSpeedCard = (props) => {
  return(
    <Card>
      <Image src="https://www.pikpng.com/pngl/m/576-5768393_transparent-clipart-crystal-ball-png-download.png" />
      <Card.Content>
        <Card.Header>Time Dilation</Card.Header>
        <Card.Meta>
          <span className='level'>Current level: {props.dropSpeedLevel}</span>
        </Card.Meta>
        <Card.Description>
          Each upgrade distorts time, causing tetramino's to fall to earth slower.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='button'>
          <Button as='div' labelPosition='left'>
            <Label basic pointing='right'>
              Upgrade:
            </Label>
            <Button icon>
              <Icon name='arrow alternate circle up outline' />
              Dynamic Cost
            </Button>
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}
