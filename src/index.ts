import { WasherTrioCompactCustomCard } from "./custom-element/washer-trio-compact-custom-card";
import { printVersion } from "./utils";

// Registering card
customElements.define("washer-trio-compact-custom-card", WasherTrioCompactCustomCard);
const w : any = window;
w.customCards = w.customCards || [],
w.customCards.push({
    type: "washer-trio-compact-custom-card",
    name: "washer-trio-compact-custom-card",
    preview: false
});
printVersion();