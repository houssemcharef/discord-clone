import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Sidebarchannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

export default function Sidebar() {
    const user = useSelector(selectUser);
    const [channel, setChannel] = useState([]);
    useEffect(() => {
        db.collection('channels').onSnapshot((snapshot) => (
            
            setChannel(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                channel:doc.data(),
            })))
        ))
    })
    const handelAddChannel = () => {
        const channel = prompt("enter a new channel name");

        db.collection("channels").add({
           
            channelName:channel
        })
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Houssem Charef</h3>
                <KeyboardArrowDownIcon/>
            </div> 

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>text</h4>
                    </div>
                    <AddIcon onClick={handelAddChannel} className="sidebar__addChannel" />
                    
                </div>
                <div className="sidebar__chanelsList">
                    {channel.map(({id, channel}) => 
                        (
                            <Sidebarchannel key={id} id={id} channelName={channel.channelName} />
                        )
                        
                    )
                    }
                    
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large" />
                <div className="sidebar__voiceInfo">
                    <h3>voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <CallIcon />
                    <InfoOutlinedIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={() => { auth.signOut() }}src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>@houssemCharef</h3>
                    <p>#{user.uid.substring(0,10)}</p>
                </div>
                <div className="sidevar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}
