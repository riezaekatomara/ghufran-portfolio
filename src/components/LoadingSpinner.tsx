export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-3">
      <div className="w-10 h-10 border-4 border-blue-500 dark:border-gray-200 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">Loading...</p>
    </div>
  );
}
