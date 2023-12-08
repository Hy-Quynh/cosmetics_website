import { useState } from "react";
import ListUserHaveChat from "./components/ListUser";
import UserChat from "./components/UserChat";

export default function AdminChat() {
  const [userSelected, setUserSelected] = useState("");

  return (
    <div style={{padding: '20px 60px', display: 'flex', justifyContent: 'flex-start'}}>
      <div style={{width: '40%'}}>
        <ListUserHaveChat
          changeUserSelected={(user) => {
            setUserSelected(user);
          }}
        />
      </div>

      <div style={{width: '60%'}}>
        <UserChat user={userSelected}/>
      </div>
    </div>
  );
}