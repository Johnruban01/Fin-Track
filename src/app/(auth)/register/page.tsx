"use client"
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import api from "../../../../core/axios";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const data = { email, password,name };

        try {
            const response = await api.post("/auth/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                redirect("/login");
            }
        }
        catch(error) {
            console.error(" Resgistartion failed:", error);
            alert("Resgistartion  failed. Please check your credentials.");
        }

    }

    return (
        <div className="w-full">
            <h3 className="text-xl font-bold text-black">REGISTER</h3>
            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        required
                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        minLength={6}
                        className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none disabled:opacity-70"
                >
                    {isLoading ? "Signing Up..." : "Sign up"}
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Have an account ?{' '}
                    <a href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                        Go back
                    </a>
                </p>
            </form>
        </div>
    );
}