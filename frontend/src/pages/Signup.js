import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    alert("Signup successful");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} />
      <button>Signup</button>
    </form>
  );
}
