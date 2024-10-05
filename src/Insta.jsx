import Account from "./Account";
import Users from "./Users";

const Insta = () => {
  return (
    <>
      <header className="flex items-start ">
        <div className="border-r-[2px] h-[100vh] w-[20vw] bg-pink-400">{<Account />}</div>
        <div className="border-b-2 w-[80vw]">{<Users />}</div>
      </header>
    </>
  );
};
export default Insta
