import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurantDishes: [],
      currentSearch: "",
    };
  }

  onInputChange = (e) => {
    this.setState({ currentSearch: e.target.value });
  }
  
  onSearchClick = () => {
    if (this.state.currentSearch !== "") {
      const url = "http://localhost:3001/recommendation?restaurantName=" + this.state.currentSearch;
      axios.get(url)
        .then((response) => {
          console.log(response)
          this.setState({ restaurantDishes: response.data.recommendation.data });
          this.setState({ currentSearch: "" });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const dishes = Object.keys(this.state.restaurantDishes).map((dish) => {
      return <li key={ dish }>{ dish } : { this.state.restaurantDishes[dish].overall_score }</li>
    })

    return (
      <div className="App">
        <div className="App-header">
          <h1 className="Title">dishdash</h1>
          <input className="Lookup" placeholder="Look up a restaurant..." value={ this.state.currentSearch }
            onChange={ this.onInputChange }/>
          <button className="Search" onClick={ this.onSearchClick }>Search</button>
          <div className="Dishes">
            { dishes }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
