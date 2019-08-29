import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurantNames: [],
      restaurantDishes: [],
      currentSearch: "",
      searchSuggestions: [],
      displayDishes: false,
    };
  }

  onInputChange = (e) => {
    this.setState({ currentSearch: e.target.value });
  
    if (e.target.value !== "") {
      const regex = new RegExp(`^${ e.target.value }`, "i");
      this.setState({ searchSuggestions: this.state.restaurantNames.sort().filter(name => regex.test(name)).slice(0, 8) });
    }
  }

  checkClearSuggestions = (e) => {
    if (e.target.value === "") {
      this.setState({ searchSuggestions: [] });
    }
  }

  searchAutoFill = (value) => {
    this.setState({ currentSearch: value }, () => { this.onSearchClick() });
  }

  onSearchKey = (e) => {
    if (e.key === "Enter") {
      this.onSearchClick();
    }
  }
  
  onSearchClick = () => {
    if (this.state.currentSearch !== "") {
      const url = process.env.REACT_APP_DISHDASH_API + "/recommendation?restaurantName=" + this.state.currentSearch.toLowerCase();
      axios.get(url)
        .then((response) => {
          console.log(response)
          this.setState({ restaurantDishes: Object.entries(response.data.recommendation.dishes) });
          this.state.restaurantDishes.sort((a, b) => {
            return b[1].overall_score - a[1].overall_score; // sort from highest to lowest overall score
          });
          this.setState({ displayDishes: true });
          this.setState({ searchSuggestions: [] });
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
    const dishes = (this.state.restaurantDishes).map((dish) => {
      return (
        <div className="Dish-card" key={ dish[0] }>
          <p className="Dish-name">{ dish[0] }</p>
          <p className="Dish-score">{ dish[1].overall_score }</p>
        </div>
      );
    })

    let backButton = null;

    if (dishes.length !== 0) {
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
              onChange={ this.onInputChange } onKeyDown={ this.onSearchKey } onKeyUp={ this.checkClearSuggestions } spellCheck="false"/>
            <button className="Search-button" style={ searchButtonStyle } onClick={ this.onSearchClick }>Search</button>
            <ul>
              { this.state.searchSuggestions.map((item, index) => <li key={ index } onClick={ () => { this.searchAutoFill(item) } }>{ item }</li>) }
            </ul>
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

  componentDidMount() {
    // fetch restaurant names for autocomplete
    const url = process.env.REACT_APP_DISHDASH_API + "/restaurant/all";
      axios.get(url)
        .then((response) => {
          console.log(response)
          this.setState({ restaurantNames: response.data.restaurants[0].names });
        })
        .catch((error) => {
          console.error(error);
        });
  }
}

export default App;
