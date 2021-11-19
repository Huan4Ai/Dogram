import { get } from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../store/post";

function UserProfilePage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const username = user.username;
  const userId = user.id;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <h2>
      {username}
    </h2>
  )



};

export default UserProfilePage;
