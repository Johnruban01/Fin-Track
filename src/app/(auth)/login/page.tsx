"use client"
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import api from "../../../../core/axios";
import { NextResponse } from "next/server";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const data = { email, password };

        try {
            const response = await api.post("/auth/login", data);
            console.log("Login response:", response.data);
            if (response.status === 200) {
                //localStorage.setItem("token", response.data.token);
                router.push("/dashboard");
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-black mb-8">Sign in to your account</p>
            
            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

                <div className="flex items-center justify-between">
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none disabled:opacity-70"
                >
                    {isLoading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}