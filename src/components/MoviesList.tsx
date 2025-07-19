import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./Pagination";
 type Movie = {
  id: number,
  [key: string]: any, // أو حددي خصائص معينة لو عندك
};
type movielistProps = {
  movies: Movie[],
  getPage: (page: number) => void,
  pageCount: number,
};
const MoviesList = ({ movies, getPage, pageCount }: movielistProps) => {
  return (
    <Row className="mt-3">
      {movies.length >= 1 ? (
        movies.map((mov) => {
          return <CardMovie key={mov.id} mov={mov} />;
        })
      ) : (
        <h2 className="text-center p-5">لا يوجد افلام...</h2>
      )}

      {movies.length >= 1 ? (
        <PaginationComponent getPage={getPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};

export default MoviesList;
