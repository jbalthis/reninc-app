import React from 'react';
import { List } from 'grommet';

export const SearchResultsList = (props) => {

  console.log(JSON.stringify(props.searchResults));
  // var results = JSON.parse(props.searchResults);
  // console.log(results.charities);
  
  return (
    <List
      data={props.searchResults}
    />
  );
}