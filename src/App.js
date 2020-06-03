import React from 'react';

import Searchbar from './components/Searchbar'
import Titlebar from './components/Titlebar'

class App extends React.Component {
  render(){
    return (
      <>
        <Titlebar />
        <Searchbar />
      </>
    );
  }
  
}

export default App;
