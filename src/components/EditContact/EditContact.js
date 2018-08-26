import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';
import TextInputGroup from '../TextInputGroup/TextInputGroup';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  inputChangedHandler = e => {
    const inputValue = e.target.value;
    this.setState({ [e.target.name]: inputValue });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required...' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required...' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required...' } });
      return;
    }

    const { id } = this.props.match.params;
    const updatedContact = {
      name,
      email,
      phone
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className=" card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    onChange={this.inputChangedHandler}
                    type="text"
                    value={name}
                    placeholder="Enter name..."
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    onChange={this.inputChangedHandler}
                    type="email"
                    value={email}
                    placeholder="Enter email..."
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    onChange={this.inputChangedHandler}
                    type="tel"
                    value={phone}
                    placeholder="Enter phone..."
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
