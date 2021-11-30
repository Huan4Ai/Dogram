import React from "react";
import { useState } from "react";
import EditCommentForm from "./EditComment";
import { Modal } from "../../context/Modal"

function EditCommentFormModal({ singleComment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="editBookingButton" onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm onClose={() => setShowModal(false)} singleComment={singleComment} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentFormModal;
