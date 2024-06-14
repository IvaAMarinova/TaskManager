import Link from 'next/link';

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Give me your information</h1>
      <form className="bg-pink-400 p-6 text-center text-white rounded">
        <label className="block mb-4">
          Username:
          <input type="text" name="username" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </label>
        <label className="block mb-4">
          Password:
          <input type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
      <Link href="/tasks" passHref>
        <span className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Login</span>
      </Link>
    </div>
  );
}
