import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Movies from './Movies';
import { movies } from './GetMovies';


export default class Navbar extends Component {
  render() {

    return (
      <div classname="navbar" style={{  display:"flex", padding:"1rem",  color:"#3742fa"  }}>

      <img style={{height:"4.5rem",marginLeft:"1rem"}} src="https://img.icons8.com/3d-fluency/94/null/cinema-.png"></img>
      <Link key={movies.results[0]} to= "/" style={{textDecoration:"none"}}><h1 style={{marginLeft:"1rem",marginTop:"0.2rem"}}>MoviesApp</h1></Link>
     
     <Link key={movies.results[1]} to= "/favourites" style={{textDecoration:"none"}}> <h2 style={{marginLeft:"2rem",marginTop:"0.8rem"}}>Favourites</h2></Link>  
   </div>
    )
  }
}

