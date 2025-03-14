import React from "react";
import { Card, Tag, Row, Col } from "antd";

const { Meta } = Card;

interface MovieCardProps {
  title: string;
   date: string;
   overview: string;
   image: string;
   genres: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ title, date, overview, image, genres }) => {

  return (
    <Card style={{ width: 450, height: 280 }}>
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
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MovieCard;
