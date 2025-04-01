const Loader = () => {
  return (
    <div className="fixed inset-0 bg-accent bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-300 border-b-indigo-500 border-l-indigo-300 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-indigo-400 border-r-indigo-200 border-b-indigo-400 border-l-indigo-200 animate-spin animation-delay-200"></div>
          <div className="absolute inset-4 rounded-full border-4 border-t-indigo-300 border-r-indigo-100 border-b-indigo-300 border-l-indigo-100 animate-spin animation-delay-400"></div>
        </div>
        
        {/* Optional loading text */}
        <p className="text-gray-600 font-medium">Loading your financial data...</p>
        
        {/* Optional progress bar */}
        <div className="w-48 h-1.5 bg-card rounded-full overflow-hidden mt-4 mx-auto">
          <div className="h-full bg-indigo-500 animate-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;