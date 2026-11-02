import { useState } from "react";

export default function PasswordInput({ name, placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrap">
      <input name={name} type={show ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} />
      <button
        type="button"
        className="pw-toggle"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
}