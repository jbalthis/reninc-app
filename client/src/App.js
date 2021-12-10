import React, { Component } from 'react';
import { 
        Box, 
        Button, 
        Collapsible, 
        Heading,
        List,
        Grommet,
        Layer,
        ResponsiveContext 
      } from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import { AppBar } from './components/AppBar';
import { SearchForm } from './components/SearchForm';
import { SearchResultsList } from './components/SearchResultsList';

const theme = {
  global: {
    colors: {
        brand: '#21265d',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      showSidebar: false,
    };
  }

  handleCallback = (childData) => {
    this.setState({apiResponse: childData})
  }

  setShowSidebar(){
    this.setState({ showSidebar: !this.state.showSidebar})
  }


  render() {
    const { apiResponse } = this.state;
    return(
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>
                  RenPSG Code Review
                </Heading>
                <Button 
                  icon={<Notification />} 
                  onClick={() => this.setShowSidebar()} 
                />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align='center' justify='center' gap="medium">
                  <SearchForm parentCallback={ this.handleCallback } />
                </Box>
                <Box flex align='center' justify='center' gap="medium">
                  {console.log(apiResponse.split("},{"))}
                  <List data={apiResponse.split("},{")} />
                </Box>
                {(!this.state.showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={this.state.showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      sidebar
                    </Box>
                  </Collapsible>
                ): (
                  <Layer>
                    <Box
                      background='light-2'
                      tag='header'
                      justify='end'
                      align='center'
                      direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setShowSidebar()}
                      />
                    </Box>
                    <Box
                      fill
                      background='light-2'
                      align='center'
                      justify='center'
                    >
                      sidebar
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    )
  }
}

export default App;