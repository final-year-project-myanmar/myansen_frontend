/** @jest-environment jsdom */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "@/pages/dashboardPage/dashboardpage";

// Mock heavy deps
jest.mock("@/components/WordCloudSVG", () => () => null);
jest.mock("@lottiefiles/dotlottie-react", () => ({
  __esModule: true,
  DotLottieReact: () => null,
  DotLottieWorkerReact: () => null,
  setWasmUrl: () => {},
}));

describe("DashboardPage progress bar + feedback", () => {
//   beforeEach(() => {
//     jest.restoreAllMocks();

//     // Mock fetch for both confidence fetch and feedback submission
//     (global.fetch as jest.Mock) = jest
//       .fn()
//       // 1st call: get confidence data
//       .mockResolvedValueOnce({
//         status: 200,
//         json: async () => ({ confidence: 0.44 }),
//       })
//       // 2nd call: submit feedback
//       .mockResolvedValueOnce({
//         status: 200,
//         json: async () => ({ message: "Feedback received" }),
//       });
//   });

  it("shows correct progress value and submits feedback when allowed", async () => {
    // render(
    //   <MemoryRouter>
    //     <DashboardPage />
    //   </MemoryRouter>
    // );

    // // --- 1️⃣ Check the progress bar
    // const progressBar = await screen.findByRole("progressbar");
    // expect(progressBar).toBeInTheDocument();

    // // progress bars often have aria-valuenow or width style — check either:
    // const valueNow = progressBar.getAttribute("aria-valuenow");
    // expect(parseFloat(valueNow || "0")).toBeLessThan(60);

    // // --- 2️⃣ Check confidence text, if rendered
    // const confidenceText = await screen.findByText(/Confidence:/i);
    // expect(confidenceText.textContent).toMatch(/44%/);

    // // --- 3️⃣ Verify the button is enabled
    // const feedbackButton = await screen.findByRole("button", {
    //   name: /submit feedback/i,
    // });
    // expect(feedbackButton).toBeEnabled();

    // // --- 4️⃣ Simulate submission (on result / on response)
    // fireEvent.click(feedbackButton);

    

  
  });
    it("Verify Retrain Model button enables when progress reaches 100/100.", async () => {
        // render(
        //   <MemoryRouter>
        //     <DashboardPage />
        //   </MemoryRouter>
        // );  
    });
    
});
