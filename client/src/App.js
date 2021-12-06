import React, { Component } from 'react';
import { 
        Box, 
        Button, 
        Collapsible, 
        Heading,
        Image,
        Form,
        FormField,
        TextInput,
        Grommet,
        Layer,
        ResponsiveContext 
      } from 'grommet';
import { FormClose, Notification } from 'grommet-icons';
import { AppBar } from './components/Appbar';

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
      value: ""
    };
  }

  callAPI() {
    fetch("http://localhost:9000/search")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  setShowSidebar(){
    this.setState({ showSidebar: !this.state.showSidebar})
  }

  setValue(value){

  }

  render() {
    
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
                <Box flex align='center' justify='center'>
                  <Form
                    value={this.state.value}
                    onChange={nextValue => this.setValue(nextValue)}
                    onReset={() => this.setValue({})}
                    onSubmit={() => this.setValue(this.value)}
                  >
                    <FormField name="name" htmlFor="text-input-id" label="Name">
                      <TextInput id="text-input-id" name="name" />
                    </FormField>
                    <Box direction="row" gap="medium">
                      <Button type="submit" primary label="Submit" />
                      <Button type="reset" label="Reset" />
                    </Box>
                  </Form>
                  <p className="App-intro"><br />***For Debugging***<br />API response:<br />{this.state.apiResponse}</p>
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