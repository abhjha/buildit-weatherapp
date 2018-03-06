import React, { Component } from 'react';
import './App.css';
import cityList from './city.list.json';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locationName:'',
      locationCountry:'',
      locationId:'',
      suggestions:[],
      cityDetails:{}
    }
  }

  saveData = (e) => {
    if(e.target.className ==="location-input") {
      this.setState(
        {locationName: e.target.value},
        () => this.populateSuggestions()
      )
    } else if(e.target.className ==="country-input") {
      this.setState({locationCountry: e.target.value})
    } else {
      this.setState({locationId: e.target.value})
    }
  }

  populateSuggestions = () => {
    let suggestions =[];
    if(this.state.locationName !== ''){
      suggestions = cityList.filter(city => 
        city.name.includes(this.state.locationName)
      );
    }
    this.setState({suggestions});
  }

  getResult = () => {
    const {locationName, locationId, locationCountry} = this.state;
    const endpoint = 'https://api.openweathermap.org/data/2.5/forecast';
    const appKey = '&appid=4451b2e7335cdc7f3916567b60ca09e9';
    let url;

    if(locationId!==''){
      url = endpoint + '?id='+ locationId + appKey;
    } else {
      url = endpoint + '?q='+ locationName +',' + locationCountry + appKey;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({cityDetails: data})
      })
      .catch((error) => {
        console.log(error);
      });   
  }

  render() {
    return (
      <div>
        <div className="input-container">
          <p className="page-title">Weather app</p>
          <p className="input-help">Enter location name and country or only ID to get details</p>
          <input 
            type="text" 
            className="location-input" 
            placeholder="Enter location name"
            onBlur={this.saveData}
          />
          <p>and</p>
          <input 
            type="text" 
            className="country-input" 
            placeholder="Enter country name"
            onBlur={this.saveData}
          />
          <p>or</p>
          <input 
            type="text" 
            className="pincode-input" 
            placeholder="Enter pin code name"
            onBlur={this.saveData}
          />
          
          <button className="btn-primary" onClick={this.getResult}>
            Get data
          </button>
        </div>
        <div className="suggestions-container" >
          <p>Some suggestions for you</p>
          {this.state.suggestions.length>0 && this.state.suggestions.map( (item, index) => {
              if(index<9) { 
                return(
                  <div key={index} className="suggestion-box">
                    <p className="suggestion-id">{item.id}</p>
                    <p className="suggestion-name">{item.name}</p>
                    <p className="suggestion-country">{item.country}</p>
                  </div>
                )
              }
              return null
            })
          }
          {this.state.locationName ==='' && (
            <p>Please fill in city name to get some suggestions</p>
          )}
          {this.state.locationName !=='' &&  this.state.suggestions.length===0 &&(
            <p>No suggestions found. Try manual search</p>
          )}        
        </div>
        <div className="result-container" >
          <p className="result-title">Weather Report</p>
          {this.state.cityDetails.city && this.state.cityDetails.city.name && (            
            <div className="city-details">
              <p><strong>City name: </strong> {this.state.cityDetails.city.name}</p>
              <p><strong>Country name: </strong> {this.state.cityDetails.city.country}</p>
              <p><strong>City ID: </strong> {this.state.cityDetails.city.id}</p>
              <p><strong>City coordinates: </strong>
                <span><strong>Lat: </strong>{this.state.cityDetails.city.coord.lat} </span>
                <span><strong>Lon: </strong>{this.state.cityDetails.city.coord.lon} </span>
              </p>
            </div>
          )}
          <div className="weather-details">
            {this.state.cityDetails.list && this.state.cityDetails.list.length>0 && this.state.cityDetails.list.map( (item, index) => (
                <div key={index} className="tile-box">
                  <p className="date"><strong>Date and Time: </strong> {item.dt_txt}</p>
                  <p className="temp"><strong>Temp: </strong>{item.main.temp}</p>
                  <p className="min-temp"><strong>Min Temp: </strong>{item.main.temp_min}</p>
                  <p className="max-temp"><strong>Max Temp: </strong>{item.main.temp_max}</p>
                  <p className="pressure"><strong>Pressure: </strong>{item.main.pressure}</p>
                  <p className="sea-level"><strong>Sea Level: </strong>{item.main.sea_level}</p>
                  <p className="description"><strong>Weather description: </strong>{item.weather[0].description}</p>
                  <p className="wind-speed"><strong>Wind speed: </strong> {item.wind.speed}</p>
                </div>
              )
            )}
            {this.state.cityDetails.list && this.state.cityDetails.list.length === 0 && (
              <p>No Data found</p>
            )}
          </div>
        </div>    
      </div>
    );
  }
}

export default App;
