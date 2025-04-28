import axios from "axios";
import React, { useEffect, useState } from "react";
import FailureView from "./FailureView";

const MainArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lists, setLists] = useState([]);
  const fetchLists = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = (await axios.get("https://apis.ccbp.in/list-creation/lists"))
        .data.lists;
      console.log(res);
      setLists(res);
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
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 ">
      {lists.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200  p-4 m-2 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MainArea;
