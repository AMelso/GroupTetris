import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'

const data = () => {
  return <>
  </>
}

export const DemolitionChargeCard = (props) => {
  return(
    <Card>
      <Image src="https://www.pikpng.com/pngl/m/576-5768393_transparent-clipart-crystal-ball-png-download.png" />
      <Card.Content>
        <Card.Header>Demolition Charge</Card.Header>
        <Card.Meta>
          <span className='level'>Current level: {props.demolitionChargeLevel}</span>
        </Card.Meta>
        <Card.Description>
          Level 1 grants access to a Demolition Charge every 90seconds, which clears the bottom row.
          Additional levels decrease the time between Charges.
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

