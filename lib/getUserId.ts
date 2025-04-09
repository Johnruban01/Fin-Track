import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded: { userId: string } = jwtDecode(token);
        return decoded.userId;
    }
    return null; // or handle the case when token is not present
}