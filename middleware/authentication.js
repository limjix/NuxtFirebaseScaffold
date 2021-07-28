/*
* How to use? Basically, on the page vue files, add middleware: "authentication"
* */

export default function ({ store, route, redirect }) {
  console.log("AUTH", store.getters["user/isAuthenticated"])
  if (
    !store.getters["user/isAuthenticated"]
  ) {
    // If not authenticated and route is not login
    console.log("Redirect Login");
    redirect("/auth");
  }
  if (store.getters["user/isAuthenticated"] && route.name === "login") {
    // if _user is authenticated and route is login
    console.log("User logged in...Redirect to Home");
    redirect("/");
  }
}
