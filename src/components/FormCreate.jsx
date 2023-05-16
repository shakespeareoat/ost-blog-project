import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, deletePost, updatePost } from "../api/api";

export const FormCreate = ({ post, mode = "create" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title || "",
    content: post.content || "",
    published: post.published,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const handleSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createPost(formData);
      if (result.id) {
        navigate("/draft");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePublishNow = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createPost(formData);
      if (result.id) {
        const { title, content, id } = result;
        const payload = {
          id: id,
          body: {
            title: title,
            content: content,
            published: true,
          },
        };

        const response = await updatePost(payload);
        if (response.status === 204) {
          navigate("/post");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function updatePostById(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        id: post.id,
        body: formData,
      };
      const { status } = await updatePost(payload);
      if (status === 204) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deletePostById(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        id: post.id,
      };
      const { status } = await deletePost(payload);
      if (status === 204) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="text-white">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div className="text-primary">Loading...</div>
        </div>
      )}
      <form>
        <div className="space-y-12">
          <div className="border-gray-900/10 pb-12">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block  font-medium leading-6 text-gray-900"
              >
                title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block  font-medium leading-6 text-gray-900"
                >
                  content
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={6}
                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    value={formData.content}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {mode === "edit" && (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              name="cancel"
              className="w-32 items-center rounded-md bg-gray-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              name="save"
              className="w-32 items-center rounded-md bg-primary-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              onClick={updatePostById}
            >
              Save
            </button>
            <button
              onClick={deletePostById}
              type="submit"
              name="save"
              className="w-32 items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          </div>
        )}

        {mode === "create" && (
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              name="cancel"
              className="w-32 items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              name="save"
              className="w-32 items-center rounded-md bg-primary-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="submit"
              name="publishnow"
              className="w-32 items-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handlePublishNow}
            >
              Publish Now
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
