import { useState } from "react";

export default function App() {
  const [toggles, setToggles] = useState<any[]>([]);
  const [active, setActive] = useState<number[]>([]);

  async function generate() {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        component: {
          currency: "CAD",
          items: [{ name: "Spray bottle", quantity: 1 }]
        }
      })
    });

    const data = await response.json();
    setToggles(data);
  }

  function toggle(index: number) {
    if (active.includes(index)) {
      setActive(active.filter(i => i !== index));
    } else {
      setActive([...active, index]);
    }
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>EDGE STATES</h2>
        <button onClick={generate}>Generate edge states</button>

        {toggles.map((t, i) => (
          <div key={i}>
            <input
              type="checkbox"
              checked={active.includes(i)}
              onChange={() => toggle(i)}
            />
            {t.title}
          </div>
        ))}
      </aside>

      <main className="preview">
        <h2>Cart Preview</h2>
        <p>Total: $37.80</p>
      </main>
    </div>
  );
}
