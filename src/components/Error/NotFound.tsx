// components/pages/NotFound.tsx
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goHome = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={goHome}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Go Back to Home
      </button>
    </div>
  );
}
