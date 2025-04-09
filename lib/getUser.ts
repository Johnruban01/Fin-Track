import { jwtDecode } from "jwt-decode";

export const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded); // Log the decoded JWT for debugging
        return decoded;
    }
    return null; // or handle the case when token is not present
}