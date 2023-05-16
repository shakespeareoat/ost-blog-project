import { useEffect, useState } from "react";
import { getPost } from "../api/api";
import { BasePagination } from "../components/BasePagination";
import { BaseCardPost } from "../components/BaseCardPost";
import DropdownPerPage from "../components/DropDownPerPage";
import FormSearch from "../components/FormSearch";
import BaseLoading from "../components/BaseLoading";

const PostPage = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [searchText, setSearchText] = useState();
  const optionsPerPage = Array.from(
    { length: 2 },
    (_, index) => (index + 1) * 10
  );
  const handlePerPageChange = (perPage) => {
    setPerPage(perPage);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (text) => {
    setCurrentPage(1);
    setSearchText(text);
  };
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      try {
        const payload = {
          page: currentPage,
          limit: perPage || "",
          term: searchText || "",
        };
        const { data } = await getPost(payload);
        setPosts(data.posts);
        setTotalPages(data.total_page);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage, perPage, searchText]);

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="grid md:grid-cols-6  grid-cols-1 gap-1">
          <div className="col-span-5">
            <FormSearch onChange={handleSearch} />
          </div>
          <div className="">
            <DropdownPerPage
              options={optionsPerPage}
              onChange={handlePerPageChange}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <BaseLoading />
      ) : (
        <div className="my-4">
          <div className="min-h-[85vh]">
            {posts?.length === 0 && (
              <div className="text-center">ไม่พบข้อมูล</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {posts?.map((post) => {
                return <BaseCardPost key={post.id} post={post} />;
              })}
            </div>
          </div>

          <div className="flex justify-end border-t pt-4">
            <div className="mr-4">
              <BasePagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
