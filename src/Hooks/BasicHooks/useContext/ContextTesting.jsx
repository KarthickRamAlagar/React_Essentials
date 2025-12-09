import { useContext } from "react";
import { UserContext } from "./UserContext";

const ContextTesting = () => {
  const { users } = useContext(UserContext);
  console.log("These file is a testing for Context API");
  console.log("The Signed in User Details are:", users);
  return <div></div>;
};

export default ContextTesting;
