import { sendRequest } from "./RestApi";
import { getDataFromLocal } from "../GetData";
import './index.css';
import React, { useState, useEffect, useRef } from 'react';

const ChatPage = () => {
  const history = getDataFromLocal();
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState(history);
  const [loading, setLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  const handleInputChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const msj = { role: "user", parts: [{ text: msg }] };
      setMsgList(prevMessageList => [...prevMessageList, msj]);
      setMsg('');
      setLoading(true);
      const response = await sendRequest(msg, msgList);

      const cvp = { role: "model", parts: [{ text: response }] };
      setLoading(false);
      setMsgList(prevMessageList => [...prevMessageList, cvp]);
    } catch (error) {
      console.error('Error:', error);
    } 
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [msgList]);

  return (
    <div id="msg-container">
      <div className='homeHeader'>
      <img  src="./public/img/chatbot.png"  width={100} height={100}  />
      <h3 >Psikolojik Destek Chatbotu</h3>
     
      </div>
      
      <div id="msg-list" ref={chatHistoryRef}>
        {msgList.slice(1).map((message, index) => (
          <div key={index} className={`message ${message.role }`}>
            <p>{message.parts[0].text}</p>
          </div>
        ))}
      </div>
      <div>
      {loading ? (
        <img src="https://c.tenor.com/Vu-x3SHwA7cAAAAC/tenor.gif" alt="cevap yazıyor.." width={28} height={28}/>
      ) : (
        " "
      )}
      
    </div>
      <form id="chat-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
        <input
          type="text"
          id="user-input"
          placeholder="Mesajınızı buraya yazabilirsiniz"
          value={msg}
          onChange={handleInputChange}
        />
        <button  type="submit" ><img src="./public/img/send.png" alt="arrow" /></button>
      </form>
      
    </div>
  );
};

export default ChatPage;


