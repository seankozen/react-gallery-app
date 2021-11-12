import React, { Component } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';


import axios from 'axios';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PicList from './components/PicList';
import NotFound from './components/NotFound';
import FourOhFour from './components/FourOhFour';
import apiKey from './config';

const api = apiKey;


export default class App extends Component {
  
  state = {
      pics: [],
      mountains: [],
      rivers: [],
      animals: []
  }
  
  //Fetch pics from Flckr on start-up
  componentDidMount() {
    this.getMountainPics("mountain");
    this.getRiverPics("river");
    this.getAnimalPics("wild_animal");
  }

  // To search for photos in search form
  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        pics: response.data.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }) 
  }

  // Fetch for Mountain pics
  getMountainPics = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            mountains: response.data.photos.photo
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        }) 
  } 

  // Fetch for River pics
  getRiverPics = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            rivers: response.data.photos.photo
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        })     
  }

  // Fetch for Animal pics
  getAnimalPics = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            animals: response.data.photos.photo
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        }) 
        
  }


  render () {
    console.log(this.state.pics);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav/>
          <Routes>
            <Route exact path="/" element={<Navigate to="/rivers" />}/>
            <Route path="/mountains" element={<PicList data={this.state.mountains} title='Mountains'/>}/>
            <Route path="/rivers" element={<PicList data={this.state.rivers} title='Rivers'/>}/>
            <Route path="/animals" element={<PicList data={this.state.animals} title='Animals'/>}/>
            <Route path="/search/:path" element={<PicList data={this.state.pics} title='Pics'/>}/>
            <Route path="*" element={<FourOhFour/>} />  
          </Routes>

        </div>
      </BrowserRouter>
    );
  }
}
