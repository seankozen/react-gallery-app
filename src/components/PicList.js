import React from 'react';

//Components
import Photo from './Photo';
import NotFound from './NotFound';


const PicList = props => {

       const results = props.data;
        let pics;
        //Check for results from search.  If found, map data
        if(results.length > 0){
             pics = results.map(pic => 
                <Photo url={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} key={pic.id} alt={pic.title}/>); 
        } else {
            pics = <NotFound />
        }

        return (

            <div className="photo-container">
                <h2>{props.title}</h2>
                <ul>
                    {pics}
                </ul>
            </div>
        )
    
}

export default PicList;