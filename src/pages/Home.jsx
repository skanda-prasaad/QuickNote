import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to QuickNote</h1>
            <p className="text-xl mb-8">Your simple and fast note-taking app.</p>
            <div>
                <Link
                    to="/login"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                    Login
                </Link>
                <Link
                    to="/dashboard"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}