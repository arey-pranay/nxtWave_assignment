import axios from "axios";
import React, { useEffect } from "react";

const MainArea = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [lists, setLists] = React.useState([]);
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

  useEffect(() => fetchLists(), []);

  return (
    <div className="grid grid-cols-5">
      {lists.map((item) => (
        <div
          key={item.id}
          className="bg-gray-200  p-4 m-2 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MainArea;
