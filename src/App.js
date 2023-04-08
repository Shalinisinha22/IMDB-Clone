
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';


import {BrowserRouter as Router,Switch,Route,Routes,BrowserRouter} from 'react-router-dom';

function App() {
  return (
  
  <>
  
  <BrowserRouter>
   <Navbar></Navbar>
    <Routes>
      <Route path="/" Component={(props)=>(
        <>
        <Banner {...props}></Banner>
        <Movies {...props}></Movies>
       
       
        
        </>
      )}> 
      </Route>
      
     <Route path="/favourites" element={<Favourite></Favourite>}/>
    
    </Routes>
    
      
      
     
  </BrowserRouter>
  
  
      {/* <Banner></Banner>
      <Movies></Movies>
    <Favourite></Favourite> */}
 
   
 

   
  
  </>
  );
}

export default App;
