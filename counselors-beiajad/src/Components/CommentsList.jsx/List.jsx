import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Comment from "../Comment/Comment";
import DeleteComment from "../Delete/DeleteComment";

function CommentsList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const URL_GET_COMMENTS = `${process.env.REACT_APP_API}commentsbyabout/${user1.id}/${props.id}`;

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
            {data.map((comment, i) => (
              <div key={i}>
                <h6>
                  <img
                    loading="lazy"
                    src={`https://res.cloudinary.com/jacobozonana/image/upload/c_crop,g_face,h_1000,w_1000/r_max/c_scale,w_40/counselor/profile${comment.author[0]._id}.png`}
                    alt=""
                  />{" "}
                  {comment.author[0].first_name}
                </h6>
                <h6>{comment.date.split("T")[0]}</h6>
                <h6>
                  <DeleteComment id={comment._id} />
                </h6>
                <h6 className="bold">{comment.subject}</h6>
                <h6>{comment.note}</h6>
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
