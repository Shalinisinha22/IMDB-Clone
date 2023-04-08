import React, { Component } from 'react'
// import { movies } from './GetMovies'
import axios from 'axios'



export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
      parr:[1],
      currpage:1,
      movies:[],
      favourites:[],
      currmovie:""
    }

  }
  async componentDidMount(){//api calls(side effects)
    //side effects
    const res=await axios.get(`
    https://api.themoviedb.org/3/movie/popular?api_key=30c4a8a8ddaa554f48f065b78ba3d058&language=en-US&page=${this.state.currpage}`)
    let data=res.data
    // console.log(data)
    this.setState({
       movies:[...data.results]
    })
    console.log("mounting done")
  }

  changeMovies=async()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=30c4a8a8ddaa554f48f065b78ba3d058&language=en-US&page=${this.state.currpage}`)
    let data=res.data;
    this.setState({
      movies:[...data.results]
    })

  }
  handleRight=()=>{
    let temparr=[]
     for(let i=1;i<=this.state.parr.length+1;i++){
         temparr.push(i)
     }
     this.setState({
      parr:[...temparr],
      currpage:this.state.currpage+1
     },  this.changeMovies)
   
  }
  handleLeft=()=>{
    if(this.state.currpage!=1){
      this.setState({
        currpage:this.state.currpage-1
      },this.changeMovies)
    }
  }
  handleClick=(value)=>{
     if(this.state.currpage!=value){
       this.setState({
        currpage:value
       },this.changeMovies)
     }
  }
  handleFavourites=(movie)=>{
    let oldData=JSON.parse(localStorage.getItem('movies') || "[]")
    if(this.state.favourites.includes(movie.id)){
       oldData=oldData.filter((m)=> movie.id!=m.id)
    }
    else{
      oldData.push(movie)
    }
    localStorage.setItem("movies",JSON.stringify(oldData))
    console.log(oldData)
    this.handleFavouritesState();
  } 
  handleFavouritesState=()=>{
    let oldData=JSON.parse(localStorage.getItem("movies") || "[]") 
    let temp=oldData.map((movie)=>movie.id)
    this.setState({
      favourites:[...temp]
    })



  }


  render() {
    // let movie=movies.results
    console.log("render")
  
    return (
    <>
     {
       this.state.movies.length === 0?
        <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>:
    <div style={{marginTop:"0.5rem"}}>
        <h1 className='text-center'><strong>Trending Movies</strong></h1>
       
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",padding:"1rem"}}>
       {
          this.state.movies.map((movieObj)=>(
         
            <div className="card movie-card " onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:""})}>
            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movie-img"/>

              <div className="movie-overview">
            
               <h6 className="card-title movie-title">{movieObj.original_title}</h6>
               
              </div>
      
          
            <div className="movie-btn" >
              {
                this.state.hover==movieObj.id &&  
               <a className="btn btn-primary favourite-btn "onClick={()=>{this.handleFavourites(movieObj)}}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to Favourites"}</a>
              }

            </div>
         </div> 
   
   
           ))
       }


      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
      <nav aria-label="Page navigation example" >
             <ul class="pagination" style={{cursor:"pointer"}} >
             <li class="page-item" ><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
              {
                this.state.parr.map((value)=>(
                  <li class="page-item"><a class="page-link" onClick={()=>{this.handleClick(value)}}>{value}</a> </li>
                ))
              }

             
               {/* <li class="page-item"><a class="page-link" href="#">2</a></li>
               <li class="page-item"><a class="page-link" href="#">3</a></li> */}
               <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
            </ul>
</nav>
</div>
    </div>
     }
    </>
    )
  }
}
