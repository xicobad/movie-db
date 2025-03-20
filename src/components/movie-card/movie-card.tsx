import React from "react";
import { Card, Tag, Row, Col, Rate } from "antd";
import MovieServices from "../../services/movie-services";

import "./movie-card.css"

const { Meta } = Card;

const movieServices = new MovieServices();

interface MovieCardProps {
  title: string;
  date: string;
  overview: string;
  image: string;
  genres: string[];
  movieId: number;
  guestSession: string | null;
  isRated: boolean;
  rating: number;
  userRating: number;
  onRate: (movieId: number, rating: number) => void;
  loadRatedMovies: () => void;
  activeTab:string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  date,
  overview,
  image,
  genres,
  movieId,
  guestSession,
  isRated,
  rating,
  userRating,
  loadRatedMovies,
  activeTab,
}) => {
  const rate = async (rating: number) => {
    if (!guestSession) {
      console.error("Нет гостевой сессии");
      return;
    }
    try {
      await movieServices.rateMovie(movieId, rating);
      if (activeTab === "rated") {
        loadRatedMovies();
      }
    } catch (error) {
      console.error("Ошибка " + error);
    }
  };

  const getRaitingColor = (rating: number) => {
    if (rating < 3) return "#E90000";
    if (rating < 5) return "#E97E00";
    if (rating < 7) return "#E9D100";
    return "#66E900";
  };

  return (
    <Card style={{ width: 500, height: 340 }}>
      <div className="rating" style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: getRaitingColor(rating),
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px"
  }}>{rating.toFixed(1)}</div>

      <Row gutter={[5, 5]} align="middle">
        <Col xs={8}>
          <img src={image} alt={title} style={{ width: "100%" }} />
        </Col>

        <Col xs={16}>
          <div style={{ marginLeft: 10 }}>
            <Meta title={title} description={date} />
            <div style={{ marginTop: 10 }}>
              {genres.map((genre, index) => (
                <Tag color="blue" key={index} style={{ marginBottom: 5 }}>
                  {genre}
                </Tag>
              ))}
            </div>
            <p style={{ marginTop: 10 }}>{overview}</p>
            {!isRated && (
              <Rate
                allowHalf
                defaultValue={userRating || 0}
                onChange={rate}
                count={10}
              />
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieCard;
