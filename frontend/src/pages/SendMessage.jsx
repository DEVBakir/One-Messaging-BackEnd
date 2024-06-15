import { useState } from "react";

function SendMessage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleAddPhoneNumber = (e) => {
    if (e.key === 'Enter' && phoneNumber.trim()) {
      setPhoneNumbers([...phoneNumbers, phoneNumber.trim()]);
      setPhoneNumber("");
    }
  };

  const handleSend = async () => {
    let numbersToSend = [...phoneNumbers];
    if (phoneNumber.trim()) {
      numbersToSend.push(phoneNumber.trim());
      setPhoneNumber("");
    }

    if (numbersToSend.length === 0) {
      setStatusMessage("No phone numbers to send message to.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/send-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: numbersToSend, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatusMessage("Messages sent successfully.");
        setPhoneNumbers([]); // Clear phone numbers after sending
        setMessage(""); // Clear the message after sending
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="send-message">
      <h1>Send Message</h1>
      <div className="form-container">
        <div className="phone-numbers-container">
          {phoneNumbers.map((num, index) => (
            <span key={index} className="phone-number-box">{num}</span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyDown={handleAddPhoneNumber}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button onClick={handleSend}>Send</button>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </div>
    </div>
  );
}

export default SendMessage;
