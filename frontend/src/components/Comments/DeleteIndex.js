import React from "react";
import { useState } from "react";
import DeleteComment from "./DeleteComment";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";


function DeleteCommentModal({singleComment}) {

  const [showModal, setShowModal] = useState(false);

  console.log(singleComment)

  const modelUserId = singleComment?.user_id;
  const currentUserId = useSelector(state => state.session.user.id);

  if (modelUserId === currentUserId) {

    return (
      <>
        <i className="far fa-trash-alt" onClick={() => setShowModal(true)}></i>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteComment onClose={() => setShowModal(false)} singleComment={singleComment} />
          </Modal>
        )}
      </>
    );

  }

  return null;


}

export default DeleteCommentModal;
