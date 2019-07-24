import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurantDishes: [],
      currentSearch: "",
      displayDishes: false,
    };
  }

  onInputChange = (e) => {
    this.setState({ currentSearch: e.target.value });
  }

  onSearchKey = (e) => {
    if (e.key === "Enter") {
      this.onSearchClick();
    }
  }
  
  onSearchClick = () => {
    if (this.state.currentSearch !== "") {
      const url = "http://localhost:3001/recommendation?restaurantName=" + this.state.currentSearch;
      axios.get(url)
        .then((response) => {
          console.log(response)
          this.setState({ restaurantDishes: response.data.recommendation.data });
          this.setState({ displayDishes: true });
          this.setState({ currentSearch: "" });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  onBackClick = () => {
    this.setState({ displayDishes: false });
    
    setTimeout(() => {
      this.setState({ restaurantDishes: [] });
    }, 500)
  }

  render() {
    const dishes = Object.keys(this.state.restaurantDishes).map((dish) => {
      return (
        <div className="Dish-card" key={ dish }>
          <p className="Dish-name">{ dish }</p>
          <p className="Dish-score">{ this.state.restaurantDishes[dish].overall_score }</p>
        </div>
      );
    })

    let backButton = null;

    if (dishes.length !== 0) {
      // dishes.unshift(
      //   <tr key="Dishes-header">
      //     <th>Dish Name</th>
      //     <th>Overall Score</th>
      //   </tr>
      // );

      backButton = <button className="Back-button" onClick={ this.onBackClick }>Back</button>;
    }

    let searchBarStyle = {};
    let searchButtonStyle = {};
    if (this.state.currentSearch !== "") {
      searchBarStyle = {
        marginLeft: '10px',
        width: '250px',
      };
      searchButtonStyle = {
        marginLeft: '10px',
        backgroundColor: '#282c34',
        color: "white",
      };
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1 className="Title">dishdash</h1>
          <div className="Search-container">
            <input className="Search-bar" style={ searchBarStyle } placeholder="Look up a restaurant..." value={ this.state.currentSearch }
              onChange={ this.onInputChange } onKeyDown={ this.onSearchKey } spellCheck="false"/>
            <button className="Search-button" style={ searchButtonStyle } onClick={ this.onSearchClick }>Search</button>
          </div>
          <CSSTransition in={ this.state.displayDishes } timeout={ 500 } classNames="Dishes-transition">
            <div>
              { dishes }
            </div>
          </CSSTransition>
          <div className="Back-container">
            { backButton }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
