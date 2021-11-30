import React from "react";
import { useState } from "react";
import EditCommentForm from "./EditComment";
import { Modal } from "../../context/Modal"
import { useSelector } from "react-redux";

function EditCommentFormModal({ singleComment }) {
  const [showModal, setShowModal] = useState(false);

  const modelUserId = singleComment?.user_id;
  const currentUserId = useSelector(state => state.session.user.id);

  if (modelUserId === currentUserId) {

    return (
      <>
        <i className="far fa-edit" onClick={() => setShowModal(true)}></i>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditCommentForm onClose={() => setShowModal(false)} singleComment={singleComment} />
          </Modal>
        )}
      </>
    );

  }

  return null;
}

export default EditCommentFormModal;
