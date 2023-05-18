import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Header, Form, FormButton, Field } from './Searchbar.styled';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchText = e => {
    setSearchText(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText === '') {
      toast.error('Please enter text for search');
      return;
    }
    onSubmit(searchText);
    //setSearchText('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <FormButton type="submit">
          <RiSearchLine />
        </FormButton>
        <Field
          type="text"
          name="searchText"
          value={searchText}
          placeholder="Search images and photos"
          onChange={handleSearchText}
        />
        <Toaster />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
