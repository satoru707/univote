import { X, Plus, Trash2 } from "lucide-react";
import profileImg from "./download.png";

const ElectionModal = () => {
  const formData = [
    {
      candidate: {
        name: "john doe",
        vote: 1400,
        percentage: 55,
        photoUrl: profileImg,
        manifesto: "Change is Here",
      },
      value: 12,
      index: 1,
    },
    {
      candidate: {
        name: "samson",
        vote: 1000,
        percentage: 45,
        photoUrl: profileImg,
        manifesto: "Greater Nacos",
      },
      value: 8,
      index: 2,
    },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-neutral-900">
              Create New Election
            </h3>
            <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Election Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Student Union President 2025"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Election description..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-4">
              Candidates (minimum 2 required)
            </label>

            {/* Add Candidate Form */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-neutral-800 mb-3">
                Add Candidate
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Candidate name"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Candidate manifesto..."
                  rows={2}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="flex-1 text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Candidates List */}
            <div className="space-y-2">
              {formData.map((candidates, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white border border-neutral-200 rounded-lg"
                >
                  {candidates.candidate.photoUrl && (
                    <img
                      src={candidates.candidate.photoUrl}
                      alt={candidates.candidate.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">
                      {candidates.candidate.name}
                    </p>
                    <p className="text-xs text-neutral-600 line-clamp-1">
                      {candidates.candidate.manifesto}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-error-500 hover:text-error-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Election
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ElectionModal;
