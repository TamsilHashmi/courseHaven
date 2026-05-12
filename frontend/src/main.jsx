import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Stroc0ZjiOE6khLYVMdBAclnawV2STTDpB2TF5C7WGRVg6Grthcs22O75kiMjqaidapDEXZvW0gu5XAf712TanT00ZfxMHjkn",
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>,
);
