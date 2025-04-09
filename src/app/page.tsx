import Link from "next/link";

export default function HomePage() {
    return (
      <div className="text-center mt-10 text-3xl font-bold text-black">
        Welcome to FinTrack 🚀
        <Link href="/login" className="text-blue-500 hover:underline ml-2">
          Login 
        </Link>
      </div>
    );
  }
  