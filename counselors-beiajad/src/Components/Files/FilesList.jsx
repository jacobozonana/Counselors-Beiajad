import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

function CommentsList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const URL_GET_FILES = `${process.env.REACT_APP_API}findfilesbyfolder`;

  useEffect(() => {
    axios
      .post(
        URL_GET_FILES,
        {
          route: `${user1.id}/photos`,
        },
        {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        }
      )
      .then((data) => setData(data.data.resources))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <>
            {data.map((image, i) => (
              <div key={i}>
                <div>
                  <img src={image.url} width="10%" height="10%" />
                </div>
              </div>
            ))}
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default CommentsList;
