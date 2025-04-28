export function CreationListContainer({
  list,
  showLeftArrow = false,
  showRightArrow = false,
  onMoveLeft,
  onMoveRight,
  isNewList = false,
}) {
  const containerClass = isNewList
    ? "bg-green-50 rounded-lg shadow-sm overflow-hidden"
    : "bg-[#EDF6FB] rounded-lg shadow-sm overflow-hidden";

  return (
    <div className={containerClass}>
      <div className="p-4 border-b border-blue-100">
        <h2 className="text-lg font-medium text-gray-700">
          List {list.list_number} ({list.count})
        </h2>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
        {list.items.map((item) => (
          <div
            key={item.id}
            className="bg-white m-3 rounded-md shadow-sm overflow-hidden"
          >
            <div className="p-4 flex justify-between items-center">
              <div className={showLeftArrow ? "ml-6" : ""}>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm italic">
                  {item.scientificName}
                </p>
              </div>
              <div className="flex items-center">
                {showLeftArrow && (
                  <button
                    onClick={() => onMoveLeft(item.id)}
                    className="text-gray-500 hover:text-gray-700 mr-2"
                    aria-label="Move left"
                  >
                    ←
                  </button>
                )}
                {showRightArrow && (
                  <button
                    onClick={() => onMoveRight(item.id)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Move right"
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {list.items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No items in this list
          </div>
        )}
      </div>
    </div>
  );
}
