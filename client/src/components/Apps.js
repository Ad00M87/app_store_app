import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Card, Image, Dropdown, Divider, Button } from 'semantic-ui-react';

class Apps extends Component {
  state = { category: '' }

  categoryOptions = () => {
    return this.props.categories.map ( (category, index) => {
      return { key: index, text: category, value: category }
    })
  }

  clearFilter = () => {
    this.setState({ category: '' });
  }

  apps = () => {
    const { apps } = this.props;
    const { category } = this.state;
    let visable = apps;
    if (category)
      visable = apps.filter( app => app.category === category)

    return visable.map( app => {
      return(
        <Grid.Column key={app.id} computer={4} mobile={16} tablet={16}>
          <Card style={styles.appCard}>
            <Image src={app.logo} />
            <Card.Content>
              <Card.Header>{app.name}</Card.Header>
              <Card.Meta>
                <span>Author: {app.author}</span>
                <span>Category: {app.category}</span>
              </Card.Meta>
              <Card.Description style={styles.cardDescription}>
                {app.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/apps/${app.id}`}>View App</Link>
            </Card.Content>
          </Card>
          <Button style={styles.buttons} color="orange">Edit App</Button>
          <Button style={styles.buttons} color="red">Delete App</Button>
        </Grid.Column>
      )
    })
  }

  render() {
    let { category } = this.state;
    return(
      <Container>
        <Header as='h3' textAlign='center'>Apps</Header>
        <Dropdown
          placeholder='Filter Apps by Category'
          fluid
          selection
          options={this.categoryOptions()}
          value={category}
          onChange={ (e, data) => this.setState({ category: data.value })}
        />
        <Divider />
        { category && <div><Button fluid basic onClick={this.clearFilter} >Clear Filter</Button> <Divider /></div>}
        <Grid columns={16}>
          <Grid.Row>
            { this.apps() }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

}

const styles = {
  cardDescription: {
    height: '100px',
    overflowY: 'scroll',
  },
  appCard: {
    height: '400px',
    marginBottom: '10px'
  },
  buttons: {
    marginBottom: '10px'
  },
}

const mapStateToProps = (state) => {
  const apps = state.apps;
  const categories = [ ...new Set(apps.map(app => app.category))]
  return { apps, categories };
}

export default connect(mapStateToProps)(Apps);
