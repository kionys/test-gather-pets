import { IPost } from "../../types/post";
import { Modal } from "../elements/modal";

export default function PostsModal({ post, onClose }: { post: IPost; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div>{JSON.stringify(post)}</div>
    </Modal>
  );
}
