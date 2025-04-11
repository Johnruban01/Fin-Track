import React from "react";
import { getUser } from "../../../lib/getUser";

export default async function page(){

    const userInfo = await getUser()
}