import axios from "axios";
import React, { useEffect, useState } from "react";
import FailureView from "./FailureView";
import ListContainer from "./ListContainer";
import ListCreationView from "./ListCreationView";
import { PropagateLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const MainArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [checkedLists, setCheckedLists] = useState([]);
  const [isListCreationView, setIsListCreationView] = useState(false);
  const [initialLists, setInitialLists] = useState([]);
  const [nextListNumber, setNextListNumber] = useState(3);
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
    if (JSON.parse(localStorage.getItem("lists")) !== null) {
      const localLists = JSON.parse(localStorage.getItem("lists"));
      setLists(localLists);
      setNextListNumber(localLists.length + 1);
      setIsLoading(false);
      toast.info("Restored your progress", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        alert("Fetching fresh lists from the API");
        const res = (
          await axios.get("https://apis.ccbp.in/list-creation/lists")
        ).data;
        console.log(res);
        setLists(organizeItems(res));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setIsLoading(false);
        setHasError(true);
      }
    }
    return;
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center grid place-items-center h-screen w-screen bg-gray-300 text-2xl text-blue-600">
        <p>Loading...</p>
        <PropagateLoader color="#1749a8" size={20} speedMultiplier={1.25} />
      </div>
    );
  }

  if (hasError) {
    return <FailureView onRetry={fetchLists} />;
  }

  const handleCreateNewList = () => {
    if (checkedLists.length !== 2) {
      setErrorMessage("You should select exactly 2 lists to create a new list");
      return;
    }

    setInitialLists(JSON.parse(JSON.stringify(lists)));

    const newList = {
      id: `list${nextListNumber}`,
      list_number: nextListNumber,
      count: 0,
      items: [],
    };

    setLists((prevLists) => [...prevLists, newList]);
    setNextListNumber((prev) => prev + 1);
    setIsListCreationView(true);
  };

  const handleListCheckChange = (listId) => {
    setCheckedLists((prev) => {
      if (prev.includes(listId)) {
        return prev.filter((id) => id !== listId);
      }
      return [...prev, listId];
    });
    setErrorMessage("");
  };

  if (isListCreationView) {
    const sortedLists = [...lists].sort(
      (a, b) => a.list_number - b.list_number
    );
    const selectedLists = sortedLists.filter((list) =>
      checkedLists.includes(list.id)
    );
    const newList = sortedLists.find(
      (list) => list.list_number === nextListNumber - 1
    );

    const handleCancelListCreation = () => {
      setLists(initialLists);
      setIsListCreationView(false);
      setCheckedLists([]);
      setNextListNumber((prev) => prev - 1);
    };

    const handleUpdateLists = () => {
      setIsListCreationView(false);
      localStorage.setItem("lists", JSON.stringify(lists));
      setCheckedLists([]);
      setInitialLists([]);
    };

    const moveItemToList = (itemId, sourceListId, targetListId) => {
      setLists((currentLists) => {
        const newLists = currentLists.map((list) => {
          if (list.id === sourceListId) {
            const itemToMove = list.items.find((item) => item.id === itemId);
            return {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
              count: list.count - 1,
            };
          }
          if (list.id === targetListId) {
            const itemToAdd = currentLists
              .find((l) => l.id === sourceListId)
              .items.find((item) => item.id === itemId);
            return {
              ...list,
              items: [...list.items, itemToAdd],
              count: list.count + 1,
            };
          }
          return list;
        });
        return newLists;
      });
    };

    return (
      <ListCreationView
        firstList={selectedLists[0]}
        newList={newList}
        secondList={selectedLists[1]}
        onCancel={handleCancelListCreation}
        onUpdate={handleUpdateLists}
        onMoveItem={moveItemToList}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        List Creation
      </h1>
      <div className="flex gap-5 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
          onClick={handleCreateNewList}
        >
          Create a new list
        </button>
        <button
          className=" border border-blue-500 hover:bg-gray-100 text-blue-500 font-medium py-2 px-6 rounded-md transition-colors"
          onClick={() => {
            localStorage.removeItem("lists");
            setNextListNumber(3);
            fetchLists();
          }}
        >
          Reset Lists <span className="text-xs">(extra feat)</span>
        </button>
      </div>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4 text-center">
          {errorMessage}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {lists.map((list) => (
          <ListContainer
            key={list.id}
            list={list}
            isChecked={checkedLists.includes(list.id)}
            onCheckChange={() => handleListCheckChange(list.id)}
          />
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />{" "}
    </div>
  );
};

export default MainArea;
