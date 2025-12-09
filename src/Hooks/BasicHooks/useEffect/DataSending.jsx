import { useState, useEffect } from "react";

const DataSending = () => {
  const [text, setText] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading state
  
  useEffect(() => {
    if (!trigger) return;
    async function SendData() {
      setIsLoading(true); // start loading
      try {
        const url = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
        const sendData = await url.json();
        console.log("Data Sent Successfully", sendData);
        setText("");
      } catch (e) {
        console.log("Error While Sending Data", e);
      } finally {
        setTrigger(false);
        setIsLoading(false); // stop loading
      }
    }
    SendData();
  }, [trigger]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type Something"
      />
      <button onClick={() => setTrigger(true)}>Send</button>

      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px",
            zIndex: 9999,
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default DataSending;
