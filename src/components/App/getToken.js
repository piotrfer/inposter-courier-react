export default function getToken() {
    return {
        token : localStorage.getItem("token"),
        user : localStorage.getItem("user") 
    } 
}