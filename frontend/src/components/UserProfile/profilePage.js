import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../store/user";


function SingleUserProfile() {
  const dispatch = useDispatch();
  const userId = useParams().userId;


  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);



  return (

    <p>
      haha
    </p>
  );



}

export default SingleUserProfile;
