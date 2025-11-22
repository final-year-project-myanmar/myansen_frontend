import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
// Patch Node's TextEncoder and TextDecoder to the global object (Jest env)
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
if (typeof global.TextEncoder === "undefined") {
    global.TextEncoder = TextEncoder;
}
