import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NeoCalc</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: "Segoe UI", system-ui;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at top, #1e293b, #020617);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e5e7eb;
    }

    .calculator {
      width: 300px;          /* was 340px */
  padding: 16px;         /* was 20px */
  border-radius: 18px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      box-shadow: 0 0 40px rgba(99,102,241,0.4);
    }

    .display {
      width: 100%;
      height: 70px;
      border-radius: 14px;
      background: rgba(0,0,0,0.4);
      color: #38bdf8;
      font-size: 32px;
      text-align: right;
      padding: 15px;
      margin-bottom: 15px;
      overflow-x: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    button {
      height: 60px;
      border-radius: 14px;
      border: none;
      font-size: 18px;
      cursor: pointer;
      color: #e5e7eb;
      background: rgba(255,255,255,0.08);
      box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
      transition: all 0.15s ease;
    }

    button:hover {
      background: rgba(99,102,241,0.4);
      box-shadow: 0 0 12px rgba(99,102,241,0.8);
    }

    .op {
      color: #f472b6;
    }

    .equal {
      grid-column: span 2;
      background: linear-gradient(135deg, #6366f1, #22d3ee);
      color: #020617;
      font-weight: bold;
    }

    .clear {
      color: #f87171;
    }

    .brand {
      text-align: center;
      margin-bottom: 10px;
      font-size: 14px;
      letter-spacing: 2px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <div class="brand">NEOCALC</div>
    <div id="display" class="display">0</div>

    <div class="grid">
      <button class="clear" onclick="clearDisplay()">C</button>
      <button onclick="append('(')">(</button>
      <button onclick="append(')')">)</button>
      <button class="op" onclick="append('/')">÷</button>

      <button onclick="append('7')">7</button>
      <button onclick="append('8')">8</button>
      <button onclick="append('9')">9</button>
      <button class="op" onclick="append('*')">×</button>

      <button onclick="append('4')">4</button>
      <button onclick="append('5')">5</button>
      <button onclick="append('6')">6</button>
      <button class="op" onclick="append('-')">−</button>

      <button onclick="append('1')">1</button>
      <button onclick="append('2')">02</button>
      <button onclick="append('3')">03</button>
      <button class="op" onclick="append('+')">+</button>

      <button onclick="append('0')">0</button>
      <button onclick="append('.')">.</button>
      <button class="equal" onclick="calculate()">=</button>
    </div>
  </div>

  <script>
    const display = document.getElementById("display");

    function append(value) {
      if (display.innerText === "0") {
        display.innerText = value;
      } else {
        display.innerText += value;
      }
    }

    function clearDisplay() {
      display.innerText = "0";
    }

    function calculate() {
      try {
        display.innerText = eval(display.innerText.replace(/×/g, "*").replace(/÷/g, "/"));
      } catch {
        display.innerText = "Error";
      }
    }
  </script>
</body>
</html>
`);
});

const port = 3000;
console.log(`🚀 NeoCalc    running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
