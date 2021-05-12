import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Card, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import DeleteMedia from "../Delete/DeleteMedia";

function MediaList() {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const URL_GET_MEDIA = `${process.env.REACT_APP_API}findmediabytag/${user1.id}`;

  useEffect(() => {
    axios
      .get(URL_GET_MEDIA, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setData(data.data.resources))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <>
            <Container>
              <Row>
                {data.map((image, i) => (
                  <div key={i}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`https://res.cloudinary.com/jacobozonana/image/upload/w_500,h_500,c_limit/${image.public_id}`}
                      />
                      <Card.Body>
                        <DeleteMedia id={image.public_id} />
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
            </Container>
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default MediaList;
