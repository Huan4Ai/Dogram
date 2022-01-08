import React from "react";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePost from "./DeletePost";

function DeletePostModal({post}) {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className="far fa-trash-alt" onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePost onClose={() => setShowModal(false)} post={post} />
        </Modal>
      )}
    </>
  );



}

export default DeletePostModal;
