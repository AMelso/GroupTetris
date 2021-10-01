import React, { useEffect, useState } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradesFirebase'



export const LookAheadCard = (props) => {
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
