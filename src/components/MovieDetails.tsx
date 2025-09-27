import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

type Genre = {
  id: number;
  name: string;
};

type Company = {
  id: number;
  name: string;
};

type Country = {
  iso_3166_1: string;
  name: string;
};

type Language = {
  english_name: string;
};

type Movie = {
  poster_path: string;
  title: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  overview: string;
  homepage: string;
  tagline: string;
  runtime: number;
  genres: Genre[];
  production_companies: Company[];
  production_countries: Country[];
  spoken_languages: Language[];
};

const MovieDetails = () => {
  const param = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  const getMovieDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.id}?api_key=b48de6a88c38c921069c2ccf7b3341a1&language=ar`
      );
      setMovie(res.data);
    } catch (err) {
      console.error("فشل تحميل تفاصيل الفيلم", err);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [param.id,getMovieDetails]);

  if (!movie) {
    return <h2 className="text-center my-5">جاري تحميل البيانات...</h2>;
  }

  return (
    <div>
      <Row className="justify-content-center p-4">
        <Col md="12" className="">
            <div className=" d-flex flex-column flex-md-row align-items-center ">
            <img
                className="img-movie w-30"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
            />

  <div className=" w-100 ">
    <div className=" text-center">
      <h4 className=" card-text-title">{movie.title}</h4>
      <ul className="list-group list-group-flush text-end">
        <li className="list-group-item">
          <strong>الشعار:</strong> <span className="text-muted">{movie.tagline || "لا يوجد"}</span>
        </li>
        <li className="list-group-item">
          <strong>تاريخ الإصدار:</strong> <span className="text-muted">{movie.release_date}</span>
        </li>
       
        <li className="list-group-item">
          <strong>التقييم:</strong> <span className="text-muted">{movie.vote_average}</span>
        </li>
       
        <li className="list-group-item">
          <strong>النوع:</strong> <span className="text-muted">{movie.genres.map((genre) => genre.name).join("، ")}</span>
        </li>
        <li className="list-group-item">
          <strong>اللغة:</strong> <span className="text-muted">{movie.spoken_languages.map((lang) => lang.english_name).join(", ")}</span>
        </li>
        <li className="list-group-item">
          <strong>الدولة:</strong> <span className="text-muted">{movie.production_countries.map((c) => c.name).join(", ")}</span>
        </li>
        <li className="list-group-item">
          <strong>شركات الإنتاج:</strong> <span className="text-muted">{movie.production_companies.map((co) => co.name).join("، ")}</span>
        </li>
      </ul>
    </div>
  </div>
</div>

        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="12" className="mt-1">
          <div className="card-story d-flex flex-column align-items-start">
            <div className="text-end p-4">
              <p className="card-text-title border-bottom">القصة:</p>
            </div>
            <div className="text-end px-2">
              <p className="card-text-story">{movie.overview}</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="10" className="mt-2 d-flex justify-content-center">
          <Link to="/">
            <button style={{ backgroundColor: "#b45b35", border: "none" }} className="btn btn-primary mx-2">
              عوده للرئيسيه
            </button>
          </Link>
          {movie.homepage && (
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
              <button style={{ backgroundColor: "#b45b35", border: "none" }} className="btn btn-primary">
                مشاهده الفيلم
              </button>
            </a>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MovieDetails;
