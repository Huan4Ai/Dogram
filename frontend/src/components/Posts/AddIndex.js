import React from "react";
import { useState } from "react";
import CreatePost from "./AddPost";
import { Modal } from "../../context/Modal";
import "./AddPost.css"

function CreatePostFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="addPostIcon">
        <i className="far fa-plus-square" onClick={() => setShowModal(true)}></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );




}

export default CreatePostFormModal
