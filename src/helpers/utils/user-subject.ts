import { BehaviorSubject } from "rxjs";

// loaderStatus as BehaviorSubject, It will work as both observer and obserable
export const userSubject = new BehaviorSubject(
  process.browser && JSON.parse(localStorage.getItem("user") || "null")
);
