import { useEffect, useState } from "react";
import { FormCreate } from "../components/FormCreate";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/api";

const EditPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);

  async function fetchPostsById() {
    setIsLoading(true);
    try {
      const payload = {
        id,
      };
      const { data } = await getPostById(payload);
      setPost(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPostsById();
  }, []);
  return (
    <div className="container mx-auto px-4">
      {post && <FormCreate post={post} mode="edit" />}
    </div>
  );
};

export default EditPage;
