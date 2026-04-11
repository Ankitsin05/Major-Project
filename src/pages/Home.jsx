import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success("Created a new room");
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("ROOM ID & username is required");
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoom();
        }
    };

    return (
        <div className="homepagewrapper">
            {/* Branding Section */}
            <div className="logoSection">
                <img className="homepagelogo" src="/code-sync.png" alt="code-sync-logo" />
                <h2 className="brandName">CodeSync</h2>
            </div>

            {/* Form Section */}
            <div className="formwrapper">
                <h4 className="mainLabel">Paste invitation Room ID</h4>
                <div className="inputGroup">
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="Room ID" 
                        onChange={(e) => setRoomId(e.target.value)} 
                        value={roomId} 
                        onKeyUp={handleInputEnter}
                    />
                    <input 
                        type="text" 
                        className="inputBox" 
                        placeholder="USERNAME" 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username} 
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>Join Room</button>
                    
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="/" className="createNewBtn">new room</a>
                    </span>
                </div>
            </div>

            {/* Footer Section */}
            <footer>
                <h4 className="footerText">
                    Built with 💖 by <span>CodeSync Team</span>
                </h4>
            </footer>
        </div>
    );
};

export default Home;