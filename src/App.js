import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addState } from './redux';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.socket = io('http://localhost:1337/');
    this.sendResponse = this.sendResponse.bind(this);
  }

  componentDidMount = () => {
    this.socket.on('greeting', (data) => { //4

      this.sendResponse({ type: 'getItem' });
    });
  }

  sendResponse(event) {
    //MAIN 'AXIOS-ish' CALL TO SERVER
    this.socket.emit(event.type, { msg: event.data });

    //SUCCESSFUL RESPONSE CALL
    this.socket.on('success', (data) => {
      console.log('server response was successful')
    });

    //UPDATE REDUX STATE WHEN NEW DATA ARRIVES
    this.socket.on('newdata', (data) => {
      this.props.addState(data.payload)
    });
  }

  render() {
    return (
      <div className="App container">
        template
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  addState: (value) => dispatch(addState(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;

