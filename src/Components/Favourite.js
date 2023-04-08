import React, { Component } from "react";
import { json } from "react-router-dom";

export default class Favourite extends Component {
   constructor(){
    super();
    this.state={
        genres:[],
        cgenre:"All Genres",
        movies:[],
        searchText:"",
        limit:5,
        currpage:1
    }
   }
   
   componentDidMount(){
    let data=JSON.parse(localStorage.getItem("movies") || "[]")
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let temparr=[]
    data.forEach((movieObj)=>{
         if(!temparr.includes(genreids[movieObj.genre_ids[0]])){
            temparr.push(genreids[movieObj.genre_ids[0]])
         } 

    })
    temparr.unshift("All Genres")
    this.setState({
      genres:[...temparr],
      movies:[...data]
  })  

   }
handleGenreChange=(genre)=>{
     this.setState({
       cgenre:genre
     })
}

sortPopularityDesc=()=>{
    let temp=this.state.movies;
    temp.sort(function (objA,objB){
        return objB.popularity - objA.popularity
    })
    this.setState({
      movies:[...temp]
    })

}
sortPopularityAsc=()=>{
  let temp=this.state.movies;
  temp.sort(function (objA,objB){
      return objA.popularity - objB.popularity
  })
  this.setState({
    movies:[...temp]
  })
}
sortRatingDesc=()=>{
  let temp=this.state.movies;
  temp.sort(function (objA,objB){
      return objB.vote_average - objA.vote_average
  })
  this.setState({
    movies:[...temp]
  })
}
sortRatingAsc=()=>{
  let temp=this.state.movies;
  temp.sort(function (objA,objB){
      return objA.vote_average - objB.vote_average
  })
  this.setState({
    movies:[...temp]
  })
}

handlePageChange=(page)=>{
  this.setState({
    currpage:page
  })
}

handleDelete=(id)=>{
 let newarr= this.state.movies.filter((movie)=>{
        return movie.id!=id
 })
 this.setState({
 movies:[...newarr]
 })
 localStorage.setItem("movies",JSON.stringify(newarr))
}

  render() {
   
  
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let filterarr=[];
    if(this.state.searchText==""){
      filterarr=this.state.movies
    }
    else{
      filterarr=this.state.movies.filter((movieObj)=>{
        let title=movieObj.original_title.toLocaleLowerCase();
        return title.includes(this.state.searchText.toLocaleLowerCase())
      }
        
      )
    }
  
    if(this.state.cgenre!=="All Genres"){
      filterarr=this.state.movies.filter((movie)=>
              genreids[movie.genre_ids[0]]==this.state.cgenre
        )
    }

    let pages=Math.ceil(filterarr.length/this.state.limit)
    let pagearr=[]
    for(let i=1;i<=pages;i++){
      pagearr.push(i)
    }

    let si=(this.state.currpage-1)*this.state.limit
    let ei=si+this.state.limit
    filterarr=filterarr.slice(si,ei)



    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group favourite-genres">
                    {
                       this.state.genres.map((genre)=>(
                           this.state.cgenre===genre?

                            <li class="list-group-item" style={{backgroundColor:"#3742fa",color:"white",fontWeight:"bold"}} >{genre}</li>
                            : 
                             <li class="list-group-item" style={{color:"#3742fa"}}onClick={()=>{this.handleGenreChange(genre)}}>{genre}</li>
                        ))
                    }

      
                
                </ul>
              </div>
              <div className="col-lg-9 favourites-table col-sm-12">
                <div className="row">
                  <input type="text" style={{marginLeft:"12rem",marginRight:"2rem",outlineColor:"#3742fa",borderRadius:"5rem"}}  placeholder="Search" className="input-group-text col-3" value={this.state.searchText} onChange={(e)=>this.setState({searchText:e.target.value})}></input>
                  <input type="number" style={{outlineColor:"#3742fa",borderRadius:"5rem"}}placeholder="Rows count" className="input-group-text col-3" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                </div>
                <div className="row">
                  <table className="table table-hover" style={{marginTop:"1rem"}}>
                    <thead className="thead-dark" style={{border:"2px"}}>
                      <tr>
                        <th scope="col" style={{paddingLeft:"8rem"}}>Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        filterarr.map((movieObj)=>(             
                             <tr >
                    
                            <td><img style={{width:"5rem"}}src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path} `} alt={movieObj.title}></img> {movieObj.original_title}</td>
                            <td ><strong>{genreids[movieObj.genre_ids[0]]}</strong></td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                          </tr>
                        ))
                      }
                     
                   
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example" >
                  <ul class="pagination">
                 
                   {
                      pagearr.map((page)=>(
                        <li class="page-item">
                        <a class="page-link" style={{cursor:"pointer"}} onClick={()=>{this.handlePageChange(page)}}>
                          {page}
                        </a>
                        </li>
                      )

                      )
                   }
                   
                 
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    )
  }
}
