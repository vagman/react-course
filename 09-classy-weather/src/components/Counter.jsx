// Lecture 175. Our First Class Component
// This is an old way of creating React components using ES6 classes.
// Although functional components with hooks are more common now,
// understanding class components is still valuable for maintaining legacy code.
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState(currentState => {
      return { count: currentState.count - 1 };
    });
  }

  handleIncrement() {
    this.setState(currentState => {
      return { count: currentState.count + 1 };
    });
  }

  render() {
    const date = new Date('june 1 2027');
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
