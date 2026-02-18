import toast from "react-hot-toast";

export default function logoutUser() {
  toast.success("Logged out successfully!");

  setTimeout(() => {
    sessionStorage.removeItem("fireOpsSession");
    window.location.href = "/";
  }, 500);  
}
