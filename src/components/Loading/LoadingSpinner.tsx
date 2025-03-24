const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center flex-1">
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
