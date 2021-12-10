import React from 'react';
import { Box, Button, FormField, TextInput } from 'grommet';

const initFormData = Object.freeze({
  name: ''
});

export const SearchForm = (props) => {

  const [formData, updateFormData] = React.useState(initFormData);
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    callAPI(formData.name);
    //props.parentCallback(callAPI(formData.name));
  };

  const callAPI = () => {
    fetch("http://localhost:9000/search?"+formData.name)
      .then(res => res.text())
      .then(res => props.parentCallback(res))
      .catch(err => err);
  }

  return (
    <>
      <FormField>
       Name
        <TextInput name="name" onChange={handleChange} />
      </FormField>
      <Box direction="row" gap="medium">
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </>
  );
}