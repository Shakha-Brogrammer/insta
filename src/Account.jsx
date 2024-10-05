import axios from "axios";
import { useEffect, useState } from "react";

const Account = () => {
  const apiUrl = "https://crudcrud.com/api/942afa6b75e94891b33b002bc7462eaa";
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/userdata/${currentUserId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  return (
    <div className="flex flex-col items-center mt-10">
      {loading ? (
        <img src="/photo-insta.jpg" className="animate-ping w-16 h-16" alt="Loading" />
      ) : userData ? (
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <img
            src="/car.jpg"
            className="w-48 h-48 rounded-full mb-4"
            alt={userData.userName}
          />
          <h1 className="font-bold">{userData.Name}</h1>
          <h2 className="text-gray-600">{userData.userName}</h2>
          <p className="text-gray-500">{userData.Email}</p>
          <p className="text-gray-500">
            Followers: {userData.followers ? userData.followers.length : 0}
          </p>
        </div>
      ) : (
        <h1>User not found!</h1>
      )}
    </div>
  );
};

export default Account;
