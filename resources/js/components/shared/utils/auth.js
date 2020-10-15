export function isLoggedIn() {
    console.log(localStorage.getItem("isLoggedin"))
    return localStorage.getItem("isLoggedin") == 'true';

}

export function logIn() {
    localStorage.setItem("isLoggedin", true);
}

export function logOut() {
    localStorage.setItem("isLoggedin", false)
}