import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import axios from 'axios';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PicList from './components/PicList';
import LoadingSpinner from './components/LoadingSpinner';
import FourOhFour from './components/FourOhFour';
import apiKey from './config';

const api = apiKey;

export default class App extends Component {
  
  state = {
      pics: [],
      mountains: [],
      rivers: [],
      animals: [],
      title: '',
      loading: true
  }
  
  //Fetch pics from Flckr on start-up
  componentDidMount() {
    this.getMountainPics("mountain");
    this.getRiverPics("river");
    this.getAnimalPics("wild_animal");
  }

  // To search for photos in search form
  performSearch = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        pics: response.data.photos.photo,
        title: query,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data.', error);
    }) 
  }

  // Fetch for Mountain pics
  getMountainPics = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            mountains: response.data.photos.photo,
            loading: false
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        }) 
  } 

  // Fetch for River pics
  getRiverPics = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            rivers: response.data.photos.photo,
            loading: false
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        })     
  }

  // Fetch for Animal pics
  getAnimalPics = (query) => {
    this.setState({ loading: true });
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            animals: response.data.photos.photo,
            loading: false
          });
        })
        .catch(error => {
          console.log('Error fetching and parsing data.', error);
        }) 
        
  }


  render () {
    //console.log(this.state.pics);
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <Nav/>
          { (this.state.loading) 
          ? <LoadingSpinner />
          //<p>Loading...</p>
          :<Switch>
            <Route exact path="/" render={ () => <Redirect to="/rivers" /> } />
            <Route path="/mountains" render={() => <PicList data={this.state.mountains} title='Mountains'/>} />
            <Route path="/rivers" render={() => <PicList data={this.state.rivers} title='Rivers'/>} />
            <Route path="/animals" render={() => <PicList data={this.state.animals} title='Animals'/>} />
            <Route path="/search/:query" render={() => <PicList data={this.state.pics} title={this.state.title}/>} /> 
            <Route component={FourOhFour} />  
          </Switch>
        }
        </div>
      </BrowserRouter>
    );
  }
}
