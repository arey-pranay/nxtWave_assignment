import axios from "axios";
import React, { useEffect, useState } from "react";
import FailureView from "./FailureView";
import ListContainer from "./ListContainer";

const MainArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  function organizeItems(data) {
    const result = [
      { id: "list1", list_number: 1, count: 0, items: [] },
      { id: "list2", list_number: 2, count: 0, items: [] },
    ];

    data.lists.forEach((item) => {
      const listIndex = item.list_number - 1;
      const itemObj = {
        id: item.id,
        name: item.name,
        description: item.description,
      };

      result[listIndex].items.push(itemObj);
      result[listIndex].count += 1;
    });

    return result;
  }
  const fetchLists = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = (await axios.get("https://apis.ccbp.in/list-creation/lists"))
        .data;
      console.log(res);
      setLists(organizeItems(res));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching lists:", error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (hasError) {
    return <FailureView onRetry={fetchLists} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <div className="flex justify-center mb-12">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
          Create a new list
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {lists.map((list) => (
          <ListContainer key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default MainArea;
