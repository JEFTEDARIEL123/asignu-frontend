import { useState } from "react";
import type { FormEvent } from "react";


export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("localhost:8080/login/{cedula}", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="cedula">
        Cedula
        <input type="text" id="cedula" name="cedula" autoComplete="name" required />
      </label>
      <button>Enviar</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}