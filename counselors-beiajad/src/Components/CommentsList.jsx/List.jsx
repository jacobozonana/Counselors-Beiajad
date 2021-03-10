import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Comment from "../Comment/Comment";

function CommentsList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const URL_GET_COMMENTS = `http://localhost:8000/api/v1/commentsbyabout/${user1.id}/${props.id}`;

  useEffect(() => {
    axios
      .get(URL_GET_COMMENTS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <>
            <div className="sticky">
              <Comment
                id={props.id}
                first_name={props.first_name}
                last_name={props.last_name}
              />
            </div>
            {data.map((user, i) => (
              <div key={i}>
                <h6>
                  <i class="far fa-user-circle"></i> {user.author[0].first_name}
                </h6>
                <h6>{user.date.split("T")[0]}</h6>
                <h6 className="bold">{user.subject}</h6>
                <h6>{user.note}</h6>
                <br />
              </div>
            ))}
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default CommentsList;
