import React from 'react';

export default class AddPoint extends React.Component {
  state = {
    point: ''
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.point) {
      this.props.handleAddPoint(this.state.point);
      this.setState({ point: '' });
    } else {
      this.props.handleError('Please add a route point');
    }
  };

  handleChange = (e) => {
    this.setState({ point: e.target.value });
  };

  render() {
    return (
      <form 
        className="add-point-form"
        onSubmit={this.handleFormSubmit}
      >
          <input 
            type="text" 
            className="add-point__input" 
            value={this.state.point}
            onChange={this.handleChange} 
            placeholder="add a route point..." 
          />
          <button className="add-point__btn">Add</button>
      </form>
    )
  }
}