import Link from 'next/link';

export default function Page() {
  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h1 className="text-pink-600 font-light text-center mb-6">Give me your information :)</h1>
        <form className="bg-pink-300 text-center text-pink-900 p-6 rounded">
          <div className="mb-4">
            <label className="block mb-2">Username:</label>
            <input type="text" name="username" className="w-full px-3 py-2 border rounded"/>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password:</label>
            <input type="password" name="password" className="w-full px-3 py-2 border rounded"/>
          </div>
          <Link href="/tasks" passHref>
            <button type="submit" className="bg-pink-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
