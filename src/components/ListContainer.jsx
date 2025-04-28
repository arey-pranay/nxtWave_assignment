export default function ListContainer({ list, isChecked, onCheckChange }) {
  return (
    <div className="bg-[#EDF6FB] rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-blue-100 flex justify-start gap-4 items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckChange}
          className="h-4 w-4 text-blue-600"
        />
        <h2 className="text-lg font-medium text-gray-700">
          List {list.list_number}
        </h2>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
        {list.items.map((item) => (
          <div
            key={item.id}
            className="bg-white m-3 rounded-md shadow-sm overflow-hidden"
          >
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-gray-500 text-sm italic">
                  {item.description}
                </p>
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
