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
      const dishRowKey = dish + '_row'
      const dishScoreKey = dish + '_score';

      return (
        <tr key={ dishRowKey }>
          <td key={ dish }>{ dish }</td>
          <td key={ dishScoreKey }>{ this.state.restaurantDishes[dish].overall_score }</td>
        </tr>
      );
    })

    if (dishes.length !== 0) dishes.unshift(
      <tr key="Dishes-header">
        <th>Dish Name</th>
        <th>Overall Score</th>
      </tr>
    )

    return (
      <div className="App">
        <div className="App-header">
          <h1 className="Title">dishdash</h1>
          <div className="Search">
            <input className="Search-bar" placeholder="Look up a restaurant..." value={ this.state.currentSearch }
              onChange={ this.onInputChange }/>
            <button className="Search-button" onClick={ this.onSearchClick }>Search</button>
          </div>
          <table className="Dishes">
            <tbody>
              { dishes }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;