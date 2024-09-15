import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PopularMoviePage  from "./Pages/PopularMoviePage"
import HighRatedPage from "./Pages/HighRatedPage"
import  UpcomingMoviePage  from "./Pages/UpcomingMoviePage"
import SingleMovieDetailPage  from "./Pages/SingleMovieDetailPage"
import Footer from "./components/Footer"

function App() {
  return (
    
    <Router>
      <div>
      <Navbar/>
        <Routes>
          <Route path='/' element = {<PopularMoviePage/>}/>
          <Route path='/HighRatedPage' element = {<HighRatedPage/>}/>
          <Route path='/UpcomingMoviePage' element = {<UpcomingMoviePage/>}/>
          <Route path='/SingleMovieDetailPage' element = {<SingleMovieDetailPage/>}/>
        </Routes>
        <Footer/>
        </div>
      </Router>

    
  )
}

export default App
