import React from "react";
import { contacts } from "../contacts.js";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img src={props.img} alt="avatar_img" className="circle-img" />
      </div>
      <div className="bottom">
        <p className="info">{props.phone}</p>
        <p className="info">{props.email}</p>
      </div>
    </div>
  );
}

console.log(contacts);
var contactCard = [];
contacts.forEach((contact) => {
  contactCard.push(
    <Card
      name={contact.name}
      img={contact.imgURL}
      phone={contact.phone}
      email={contact.email}
    />
  );
});

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contactCard}
    </div>
  );
}

export default App;
