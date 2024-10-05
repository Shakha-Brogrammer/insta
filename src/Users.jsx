import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Button, Dialog } from "@material-tailwind/react";

const Users = () => {
  const apiUrl = "https://crudcrud.com/api/942afa6b75e94891b33b002bc7462eaa";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/userdata`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser({ ...user, followers: user.followers || [] });
    setOpen(true);
  };

  const handleFollow = async (userId) => {
    try {
      const res = await axios.get(`${apiUrl}/userdata/${userId}`);
      const user = res.data;
      const isFollowing = user.followers.includes(currentUserId);
      const updatedFollowers = isFollowing
        ? user.followers.filter(id => id !== currentUserId)
        : [...user.followers, currentUserId];

      await axios.put(`${apiUrl}/userdata/${userId}`, {
        ...user,
        followers: updatedFollowers,
      });

      setData(prevData => prevData.map(item => 
        item._id === userId ? { ...item, followers: updatedFollowers } : item
      ));
    } catch (error) {
      console.error("Error following the user:", error);
    }
  };

  return (
    <>
      <nav className="flex p-6 gap-3">
        {loading ? (
          <div className="w-full h-screen bg-white fixed top-0 left-0 flex justify-center items-center">
            <img
              src="/photo-insta.jpg"
              className="animate-ping w-16 h-16"
              alt="Loading"
            />
          </div>
        ) : data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              onClick={() => handleOpen(item)}
              className="flex flex-col hover:scale-110 transition-all w-24 h-24 cursor-pointer"
            >
              <div className="w-full p-1 rounded-full bg-pink-300 flex justify-center items-center">
                <img
                  src="./car.jpg"
                  className="w-full rounded-full p-1 bg-white"
                  alt={item.userName}
                />
              </div>
              <h1 className="text-center">{item.userName}</h1>
            </div>
          ))
        ) : (
          <h1>Nothing was found!!! Check crudcrud</h1>
        )}
      </nav>

      <Dialog
        className="flex flex-col items-center p-5"
        open={open}
        handler={() => setOpen(false)}
      >
        <div className="flex p-10 border-white flex-col gap-5">
          <img
            src="/car.jpg"
            className="border border-white mb-6 w-48 rounded-full"
            alt="User"
          />
          {loading ? (
            <div className="flex justify-center items-center">
              <img
                src="/photo-insta.jpg"
                className="animate-spin w-16 h-16"
                alt="Loading"
              />
            </div>
          ) : selectedUser ? (
            <>
              <h1 className="font-semibold text-gray-800">
                Name: <span className="text-blue-900">{selectedUser.Name}</span>
              </h1>
              <h1 className="font-semibold text-gray-800">
                User name: <span className="text-blue-900">{selectedUser.userName}</span>
              </h1>
              <h1 className="font-semibold text-gray-800">
                Email: <span className="text-blue-900">{selectedUser.Email}</span>
              </h1>
              <h1 className="font-semibold text-gray-800">
                Followers: <span className="text-blue-900">{selectedUser.followers.length}</span>
              </h1>
            </>
          ) : (
            <h1>Nothing was found!!!</h1>
          )}
        </div>

        <Button onClick={() => handleFollow(selectedUser._id)} className="bg-blue-800">
          {selectedUser && selectedUser.followers.includes(currentUserId) ? 'Unfollow' : 'Follow'}
        </Button>
      </Dialog>
    </>
  );
};

export default Users;
