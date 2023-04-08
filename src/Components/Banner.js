import React, { Component } from 'react'
import { movies } from './GetMovies'

export default class Banner extends Component {
  render() {
    console.log(movies)
    let movie=movies.results[0]
    return (
      
            <>
            {   movie === ''?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div className="card banner-card ">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
                {/* <div className="card-body"> */}
                   <div className="banner-overview">
                   <h3 className="card-title banner-title">{movie.original_title}</h3>
                    {/* <p className="card-text banner-text ">{movie.overview}</p> */}
                   </div>
                  
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                {/* </div> */}
                </div>
            }
            </>
    )
  }
}
