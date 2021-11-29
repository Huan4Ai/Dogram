import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createComment } from "../../store/comment";


function AddComment({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user_id = useSelector((state) => state.session?.user?.id);
    const post_id = post.id;
    const [content, setContent] = useState("");

    const reset = () => {
        setContent("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            user_id,
            post_id,
            content
        };
        let createdComment = await dispatch(createComment(data, post_id));
        if (createdComment) {
            history.push("/");
            reset();
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id='content' type="text" className="inputField" onChange={(e) => setContent(e.target.value)} value={content} required />
                <button type="submit">Post</button>
            </form>
        </div>
    )

}

export default AddComment;
