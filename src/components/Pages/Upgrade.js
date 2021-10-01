import React, { useEffect } from 'react'
import { Container, Image, Button, Card, Icon, Label, Divider, Grid } from 'semantic-ui-react'
import { useAuthState } from '../../firebase'
import { GetPoints, GetUpgrades, SaveUpgrade, SpendPoints } from './UpgradeFiles/UpgradesFirebase'



// creates header which is setup to be a row of equally divided/spaced parts, pieces may be added to it.
const UpgradeHeader = () => {

  const { user } = useAuthState() // Returns user object, can access user.UID from that.

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

  useEffect(() => {
    const points = async () => {
    
      const totalPoints = await GetPoints()
      console.log(totalPoints)
    }
    points()
  }, [])

  

  return(
    <Grid columns='equal'>
      {/* column 1 */}
      <Grid.Column width={8}>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{user?.email}</span>
      </Grid.Column>
      {/* column 2 */}
      <Grid.Column>
        Points: 
      </Grid.Column>
    </Grid>
  )
}

// a container < that contains a row < of columns which are the upgrade cards
const UpgradeCards = () => {

  return(
    <Container>
      <Grid columns='equal'>

        {/* 1st upgrade card */}
        <Grid.Column>
          <Card>
            <Image src="https://www.pikpng.com/pngl/m/576-5768393_transparent-clipart-crystal-ball-png-download.png" />
            <Card.Content>
              <Card.Header>Fore Sight</Card.Header>
              <Card.Meta>
                <span className='level'>Current level: </span>
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
        </Grid.Column>

        {/* 2nd upgrade card */}
        <Grid.Column>
          <Card>
            <Image src="" />
            <Card.Content>
              <Card.Header>Bomb</Card.Header>
              <Card.Meta>
                <span className='level'>Current level: </span>
              </Card.Meta>
              <Card.Description>
                Each upgrade increases the bombs blast radius.
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
        </Grid.Column>

        {/* 3rd upgrade card */}
        <Grid.Column>
          <Card>
            <Image src="" />
            <Card.Content>
              <Card.Header>upgrade 3</Card.Header>
              <Card.Meta>
                <span className='level'>Current level: </span>
              </Card.Meta>
              <Card.Description>
                desc.
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
