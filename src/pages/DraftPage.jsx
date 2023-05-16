import { useEffect, useState } from "react";
import { getPostDraft } from "../api/api";
import DropdownPerPage from "../components/DropDownPerPage";
import ItemDraft from "../components/ItemDraft";
import BaseLoading from "../components/BaseLoading";
import FormSearch from "../components/FormSearch";
import { BasePagination } from "../components/BasePagination";

const DraftPage = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState();
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchText, setSearchText] = useState();

  async function fetchPostsByDraft() {
    setIsLoading(true);
    try {
      const payload = {
        page: currentPage,
        limit: perPage || "",
        term: searchText || "",
      };
      const { data } = await getPostDraft(payload);
      setPosts(data.posts);
      setTotalPages(data.total_page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchPostsByDraftReload() {
    fetchPostsByDraft();
  }

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
    fetchPostsByDraft();
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
      <div>
        {isLoading ? (
          <BaseLoading />
        ) : (
          <div className="min-h-[85vh]">
            <ItemDraft
              posts={posts}
              fetchPostsByDraft={fetchPostsByDraftReload}
            />
          </div>
        )}
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
  );
};

export default DraftPage;
