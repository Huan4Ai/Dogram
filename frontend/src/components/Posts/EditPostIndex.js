import React from "react";
import { useState } from "react";
import EditPost from "./EditPost";
import { Modal } from "../../context/Modal";

function EditPostFormModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <i className="far fa-edit" onClick={() => setShowModal(true)}></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPost onClose={() => setShowModal(false)} post={post}/>
        </Modal>
      )}
    </>
  );




}

export default EditPostFormModal
