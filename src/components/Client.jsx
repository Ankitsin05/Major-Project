import React from "react";

const Client = ({ username }) => {
  const getGradient = (name) => {
    const gradients = [
      "linear-gradient(135deg, #667eea, #764ba2)",
      "linear-gradient(135deg, #ff6a00, #ee0979)",
      "linear-gradient(135deg, #00c6ff, #0072ff)",
      "linear-gradient(135deg, #11998e, #38ef7d)",
      "linear-gradient(135deg, #fc466b, #3f5efb)"
    ];
    return gradients[name.charCodeAt(0) % gradients.length];
  };

  return (
    <div className="client">
      <div
        className="avatar"
        style={{ background: getGradient(username) }}
      >
        {username.charAt(0).toUpperCase()}
      </div>

      <div className="userInfo">
        <span className="userName">{username}</span>
        {/* <span className="status">online</span> */}
      </div>
    </div>
  );
};

export default Client;