/* eslint-disable no-unused-vars */
import { Navigate, redirect } from "react-router-dom";
import { client } from "../sanityConfig";
import { v4 as uuidv4 } from "uuid";

export function saveIpe(
  ipeId,
  userId,
  setSavedLength,
  setSavingPost,
  setsavedPost
) {
  client
    .patch(ipeId)
    .setIfMissing({ save: [] })
    .append("save", [
      {
        _key: uuidv4(),
        userid: userId,
        savedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit()
    .then(res => {
      setSavedLength(res.save.length);
      setSavingPost(false);
      setsavedPost(true);
      //   revalidate();
      return res;
    })
    .catch(error => {
      setSavingPost(false);
      setsavedPost(false);
      throw new Error(
        `something went wrong couldn't fetch feed ${JSON.stringify(error)}`
      );
    });
}
export function deleteIpe(ipeId, setIsDeleted) {
  client
    .delete(ipeId)
    .then(res => {
      if (ipeId == res.documentIds[0]) {
        setIsDeleted(true);
      }
    })
    .catch(err => {
      console.error("Delete failed: ", err.message);
    });
}
export function deleteAllipes() {
  client.delete({ query: `*[_type == 'ipe']` }).then(() => {
    console.log("all documents was deleted");
  });
}
export async function saveComment(userId, ipeId, comment) {
  const res = await client
    .patch(ipeId)
    .setIfMissing({ comments: [] })
    .prepend("comments", [
      {
        _key: uuidv4(),
        comment,
        date: new Date().toISOString(),
        postedBy: {
          _type: "postedBy",
          _ref: userId,
        },
      },
    ])
    .commit();

  return res;
}
