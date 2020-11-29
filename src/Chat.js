import React, { useEffect, useState } from 'react'
import './Chat.css'
import Chatheader from './ChatHeader'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelInfo } from './features/appSlice';
import firebase from "firebase";
import db from "./firebase.js"

export default function Chat() {
    const user = useSelector(selectUser);
    const channelInfo = useSelector(selectChannelInfo);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        if (channelInfo.channelId) {
            db.collection("channels")
                .doc(channelInfo.channelId)
                .collection("message")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }
    }, [channelInfo.channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("channels").doc(channelInfo.channelId).collection("message")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user,
            });
        setInput("");
    }
    

    return (
        <div className="chat">
            <Chatheader channelName={channelInfo.channelName} />
            <div className="chat__messages">
                {messages.map((message) => (
                    
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}
                
                
            </div>
            <div className="chat__input">
                <AddCircleRoundedIcon fontSize="large" />
                <form>
                    <input
                        value={input}
                        disabled={!channelInfo.channelId}
                        onChange={(e)=> setInput(e.target.value)}
                        placeholder={`Message ${channelInfo.channelName}`}
                    />
                    <button className="chat__inputButton"
                        disabled={!channelInfo.channelId}
                        type="submit"
                        onClick={sendMessage}>
                        Send Message
                    </button>
                </form>
          
                <div className="chat__inputIcons">
                    <CardGiftcardIcon  fontSize="large"/>
                    <GifIcon fontSize="large"/>
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}
