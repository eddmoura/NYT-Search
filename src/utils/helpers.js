import axios from 'axios';


var nytAPI = "084695a4f40f4643b10304a7232b2b08";

// Exporting an object with methods for retrieving and posting data to our API
const helper = {
  // Returns a promise object we can .then() off inside our Parent component
  getArticles: function() {
    return axios.get("/api/saved");
  },
  // Also returns a promise object we can .then() off inside our Parent component
  // This method takes in an argument for what to post to the database
  saveArticles: function(articleData) {
    return axios.post("/api/saved", articleData);
  },

  deleteArticles: function() {
    return axios.delete("/api/saved/:id");
  }
};

export default helper;