import { CreationListContainer } from "./CreationListContainer";

export default function ListCreationView({
  firstList,
  newList,
  secondList,
  onCancel,
  onUpdate,
  onMoveItem,
}) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CreationListContainer
          list={firstList}
          showRightArrow={true}
          onMoveRight={(itemId) => onMoveItem(itemId, firstList.id, newList.id)}
        />
        <CreationListContainer
          list={newList}
          showLeftArrow={true}
          showRightArrow={true}
          onMoveLeft={(itemId) => onMoveItem(itemId, newList.id, firstList.id)}
          onMoveRight={(itemId) =>
            onMoveItem(itemId, newList.id, secondList.id)
          }
          isNewList={true}
        />
        <CreationListContainer
          list={secondList}
          showLeftArrow={true}
          onMoveLeft={(itemId) => onMoveItem(itemId, secondList.id, newList.id)}
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}
