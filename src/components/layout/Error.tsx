import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';


interface ErrorProps {
  message?: string;
  refresh: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, refresh }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-sm text-gray-500 mb-6">
          {message || 'We encountered an error while processing your request.'}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={refresh}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Refresh page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;