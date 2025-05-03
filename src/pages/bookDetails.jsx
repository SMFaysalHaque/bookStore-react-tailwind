import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { name } = useParams();

  console.log(name);

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Book Cover */}
        <div className="w-full md:w-1/3">
          <img
            src="/book1.PNG" // Place the image in the public folder
            alt="Little Women Cover"
            className="w-full h-auto rounded border border-gray-300"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 space-y-2">
          <h2 className="text-xl font-bold">
            Title:{" "}
            <span className="text-black">
              Little Women; Or, Meg, Jo, Beth, and Amy
            </span>
          </h2>
          <p className="text-gray-700">
            Author:{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Alcott, Louisa May
            </span>
          </p>
          <p className="text-sm text-gray-500">Id: 37106</p>

          {/* Buttons */}
          <div className="pt-4 space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
              Download
            </button>
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Online Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
