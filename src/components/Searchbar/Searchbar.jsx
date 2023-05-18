import { Component } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Header, Form, FormButton, Field } from './Searchbar.styled';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchText: '',
  };

  handleSearchText = e => {
    this.setState({
      searchText: e.currentTarget.value.toLowerCase().trim(),
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { searchText } = this.state;
    if (searchText === '') {
      toast.error('Please enter text for search');
      return;
    }
    this.props.onSubmit(searchText);
    this.setState({ searchText: '' });
  };

  render() {
    const { searchText } = this.state;

    return (
      <Header>
        <Form onSubmit={this.onSubmit}>
          <FormButton type="submit">
            <RiSearchLine />
          </FormButton>
          <Field
            type="text"
            name="searchText"
            value={searchText}
            placeholder="Search images and photos"
            onChange={this.handleSearchText}
          />
          <Toaster />
        </Form>
      </Header>
    );
  }
}
