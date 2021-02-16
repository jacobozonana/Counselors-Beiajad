import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import List from "./List";

function ScheduleList() {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <List lista="schedules" log="" />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default ScheduleList;
