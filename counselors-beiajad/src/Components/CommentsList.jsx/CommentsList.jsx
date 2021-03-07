import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import List from "./List";

function CommentsList(props) {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <List
              id={props.id}
              first_name={props.first_name}
              last_name={props.last_name}
            />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default CommentsList;
