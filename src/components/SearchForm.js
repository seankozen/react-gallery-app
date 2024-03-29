import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class SearchForm extends Component {

    state = {
        searchText: ''
    }

    //Update searchText value
    onSearchChange = e => {
        this.setState({ searchText: e.target.value});
    }

    //Handles the submission of a search query and pushes url on the history stack
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSearch(this.state.searchText);
        this.props.history.push(`/search/${this.state.searchText}`);    //Push onto history stack
        e.currentTarget.reset();
    }

    // Checks the url against the current search, if no match, updates component
    componentDidUpdate(prevProps){
        
        //Checks url for "search" and if previous path is the same as the current url, if not, searches again
        if(prevProps.location.pathname !== this.props.location.pathname){
            if(this.props.location.pathname.includes('/search')) {
                const newSearch = this.props.location.pathname.replace('/search/', '');
                this.props.onSearch(newSearch);
            } 
        }
    } 

    render() {
        return (
            
            <form className="search-form" onSubmit={this.handleSubmit} >
                <input type="search" 
                       name="search" 
                       placeholder="Search" 
                       required onChange={this.onSearchChange}/>
                <button type="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button> 
            </form>
            


        );
    }
}

export default withRouter(SearchForm);