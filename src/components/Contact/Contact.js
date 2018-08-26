import React, { Component } from 'react';
import { Consumer } from '../../Context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showInfo: false
  };

  showInfoHandler = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  removeContact = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { name, email, phone, id } = this.props.contact;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={this.showInfoHandler}
                  className="fa fa-sort-down pointer"
                />
                <i
                  onClick={() => this.removeContact(id, dispatch)}
                  className="fa fa-times ml-4 pointer float-right red"
                />
                <Link to={`edit/${id}`}>
                  <i className="fas fa-pencil-alt pointer float-right mr-1" />
                </Link>
              </h4>
              {this.state.showInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
