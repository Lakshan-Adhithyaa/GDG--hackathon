import React, { useState } from "react";
import TogglePanel from "./panels/TogglePanel";
import PreviewPanel from "./panels/PreviewPanel";
import ContradictionPanel from "./panels/ContradictionPanel";

import { applyEdgeCases } from "./engine/mutationEngine";
import { evaluateContradictions } from "./engine/ruleEngine";

const schema = {
  status: { type: "enum", values: ["success", "error", "loading"] },
  data: { type: "object", optional: true },
  count: { type: "number" },
};

const defaultProps = {
  status: "success",
  data: { name: "Demo" },
  count: 5,
};

interface AIScenario {
  title: string;
  mutations: Record<string, any>;
}

const Explorer: React.FC = () => {
  const [baseProps] = useState(defaultProps);
  const [edgeCases, setEdgeCases] = useState<any[]>([]);
  const [activeCases, setActiveCases] = useState<any[]>([]);
  const [currentProps, setCurrentProps] = useState(defaultProps);
  const [contradictions, setContradictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Call backend to get AI edge cases
  async function simulate() {
    setLoading(true);

    try {
      const response = await fetch("/api/generate-edge-cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schema,
          componentName: "DemoComponent",
        }),
      });

      const data: AIScenario[] = await response.json();

      // Convert AI response to toggle format
      const normalizedCases = data.map((item, index) => ({
        id: `ai-${index}`,
        name: item.title,
        severity: "medium",
        patch: (props: any) => ({
          ...props,
          ...item.mutations,
        }),
      }));

      setEdgeCases(normalizedCases);
      setActiveCases([]);
      setCurrentProps(baseProps);
      setContradictions([]);
    } catch (error) {
      console.error("AI fetch failed:", error);
    }

    setLoading(false);
  }

  // 🔁 Toggle logic
  function toggleCase(edgeCase: any) {
    let updatedActive;

    if (activeCases.includes(edgeCase)) {
      updatedActive = activeCases.filter((c) => c !== edgeCase);
    } else {
      updatedActive = [...activeCases, edgeCase];
    }

    setActiveCases(updatedActive);

    const updatedProps = applyEdgeCases(baseProps, updatedActive);
    setCurrentProps(updatedProps);

    const issues = evaluateContradictions(updatedProps);
    setContradictions(issues);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL */}
      <div style={{ width: "300px", padding: "20px", borderRight: "1px solid #ddd" }}>
        {!edgeCases.length ? (
          <button onClick={simulate} disabled={loading}>
            {loading ? "Generating..." : "Simulate Edge Cases"}
          </button>
        ) : (
          <TogglePanel
            edgeCases={edgeCases}
            activeCases={activeCases}
            onToggle={toggleCase}
          />
        )}

        <div style={{ marginTop: "20px" }}>
          <h4>Live JSON</h4>
          <pre style={{ background: "#111", color: "#0f0", padding: "10px" }}>
            {JSON.stringify(currentProps, null, 2)}
          </pre>
        </div>
      </div>

      {/* CENTER PREVIEW */}
      <div style={{ flex: 1, padding: "20px" }}>
        <PreviewPanel props={currentProps} />
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "300px", padding: "20px", borderLeft: "1px solid #ddd" }}>
        <ContradictionPanel contradictions={contradictions} />
      </div>
    </div>
  );
};

export default Explorer;
