import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
 
import { toast } from "react-toastify";

const Contact =()=>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, SetMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail =async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const{data} = await axios.post("http://localhost:4000/send/mail", {
        name,
        email,
        phone,
        message
      } ,
       {
        withCredentials: true, 
        headers:{"Content-type":"application/json"},
      }
    );
    setName("");
    setEmail("");
    setPhone("");
    SetMessage("");
    toast.success(data.message);
    setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="contact">
      <form onSubmit={sendMail}>
        <h1>CONTACT US</h1>
        <div>
          <label>Name</label>
          <input type="text" 
          value={name} 
          onChange={(e)=> setName(e.target.value)} >
          </input>
        </div>
        <div>
          <label>Email</label>
          <input type="email"
          value={email} 
          onChange={(e)=> setEmail(e.target.value)} > 
          </input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number"
          value={phone} 
          onChange={(e)=> setPhone(e.target.value)} > 
          </input>
        </div>
        <div>
          <label>Message</label>
          <input type="text" 
          value={message} 
          onChange={(e)=> SetMessage(e.target.value)} >
          </input>
        </div>
         
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {loading && <ClipLoader size={20} color="white" />}
          Send Message
        </button>
      </form>
    </section>
  )
}
export default Contact;