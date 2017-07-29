import React from "react";
import Search from "./Search";
import Saved from "./Saved";

import helpers from "../utils/helpers";
import axios from "axios";
var nytAPI = "084695a4f40f4643b10304a7232b2b08";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      searchResults: []
    }
  }

  makeRequest = (topic, beginYear, endYear) => {
    console.log('MAKE REQUEST FUNCTION:')
    console.log(this.state)
    // axios call to the NYT API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";
    axios.get(queryURL).then(function(response) {
      console.log(response.data.response.docs);
      // If get get a result, return that result's formatted articles property
      if (response.data.response.docs) {
        // push those results into the searchResults array
        this.setState({ searchResults: response.data.response.docs});
      }
      // If we don't get any results, return an empty string
      return "";
    }.bind(this));
  }

  saveButton = (event, index) => {
    event.preventDefault();
    console.log("index in save button function: " + index);
    var chosenArticle = this.state.searchResults[index];
    console.log(chosenArticle);
    helpers.saveArticles(chosenArticle)
        .then(function() {
          console.log("Posted to MongoDB");
        });
  }
  
  render(){
    console.log("Search Results");
    console.log(this.state.searchResults);
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>New York Times Article Search</h1>
          <p>Search for articles from the New York Times and save the articles you would like to keep.</p>
        </div>
        <Search makeRequest={this.makeRequest} searchResults={this.state.searchResults} saveButton={this.saveButton}/>
        <Saved />
      </div>
    );
  }
};
export default Main;