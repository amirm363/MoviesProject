import { atom } from "recoil";

export const userCredentials = atom({
    key: "userCredentials",
    default: { userName: "", password: "" }
})