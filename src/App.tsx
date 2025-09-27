import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
function App() {
  const [movies, setMovies] = useState([])
  const [pageCount, setpageCount] = useState(0)

  const getAllMovies=async()=>{
    const response=await axios.get(`https://api.themoviedb.org/3/movie/popular?language=ar-US&api_key=b48de6a88c38c921069c2ccf7b3341a1
    `)
    setMovies(response.data.results)
    setpageCount(response.data.total_pages)
  }

   //get current page
  const getPage = async (page:number) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=b48de6a88c38c921069c2ccf7b3341a1
`)
    setMovies(response.data.results)
    setpageCount(response.data.total_pages)
  }
  useEffect(()=>{
    getAllMovies();
  },[])

  const searsh = async(word:string)=>{
    if(word===""){
      getAllMovies();
    }else{
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b48de6a88c38c921069c2ccf7b3341a1&query=${word}&language=ar`)
      setMovies(response.data.results)
      setpageCount(response.data.total_pages)
    }
  }
  return (
    <div className="font color-body ">
      <NavBar search={searsh} />
      <Container>
          <BrowserRouter basename="/movieApp">
            <Routes>
              <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount}/>} />
              {/* باقي الصفحات */}
               <Route path="/movie/:id" element={<MovieDetails/>} />
            </Routes>
         </BrowserRouter>
       
      </Container>
    </div>
  );
}

export default App;
