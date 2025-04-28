import failureImage from "../assets/FailureImage.png";
export default function FailureView({ onRetry }) {
  return (
    <div className="text-center py-8">
      <img src={failureImage} alt="Failure" className="mx-auto mb-4" />

      <p className="text-[#475569] mb-4 text-4xl">
        Something went wrong. Please try again
      </p>
      <button
        onClick={onRetry}
        className="bg-[#3B82F6] hover:bg-blue-600 text-white font-medium py-2 px-4 text-sm rounded-md mt-16"
      >
        Try Again
      </button>
    </div>
  );
}
