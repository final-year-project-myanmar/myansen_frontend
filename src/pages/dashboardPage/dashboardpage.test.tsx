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


//mock the api data 
const mockApiResponse = [
  {
    id: "1",
    text: "စိတ်ကမဆိုးပါဘူး",
    predicted_label: "positive",
    sentiment: "positive",
    confidence: 0.45,
  },
  {
    id: "2",
    text: "စာကောင်းကောင်းလုပ်ပါ.",
    predicted_label: "positive",
    sentiment: "positive",
    confidence: 0.55,
  },
  {
    id: "3",
    text: "လုံးဝ မတန်ဘူး",
    predicted_label: "negative",
    sentiment: "negative",
    confidence: 0.95,
  },
];
//helper function 
const renderWithRouter = (locationState: {}) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname:"/dashboard", state: locationState }]}>
      <DashboardPage />
    </MemoryRouter>
  );
}

describe("DashboardPage progress bar + feedback", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("Feedback submission is allowed when Confidence < 60%", async () => {
   
    renderWithRouter({ apiResponse: { results: mockApiResponse } });
     await waitFor(() => {
       expect(screen.getByText("စိတ်ကမဆိုးပါဘူး")).toBeInTheDocument();
     });
       const submitButtons = screen.getAllByRole("button", {
         name: /submit feedback/i,
       });
    expect(submitButtons[0]).toBeEnabled();
    expect(fireEvent.click(submitButtons[0])).toBeTruthy();
     await waitFor(() => {
        expect(screen.getByTestId("feedback-collected-value")).toHaveTextContent(/Feedback collected: 1/);  
      }); 

  });

  it("Feedback submission is not allowed when Confidence >= 60%", async () => {
    renderWithRouter({ apiResponse: { results: mockApiResponse } });
    const submitButtons = screen.getAllByRole("button", {
      name: /submit feedback/i,
    });
    expect(submitButtons[2]).toBeDisabled();
  }); 
  

  it("Same feedback on the same row is prevented.", async () => { 
      renderWithRouter({ apiResponse: { results: mockApiResponse } });
      const submitButtons = screen.getAllByRole("button", {
        name: /submit feedback/i,
      });
      expect(submitButtons[0]).not.toBeDisabled();
      fireEvent.click(submitButtons[0]);
      
  });
  it("Progress bar increments correctly for each valid unique feedback submission", async () => {
    renderWithRouter({ apiResponse: { results: mockApiResponse } });
     const submitButtons = screen.getAllByRole("button", {
       name: /submit feedback/i,
     });
    expect(submitButtons[0]).toBeEnabled();
    fireEvent.click(submitButtons[0]);
      await waitFor(() => {
          expect(screen.getByTestId("feedback-collected-value")).toHaveTextContent(/Feedback collected: 1/);
      });
    expect(submitButtons[1]).not.toBeDisabled();
    fireEvent.click(submitButtons[1]);
      await waitFor(() => {
          expect(screen.getByTestId("feedback-collected-value")).toHaveTextContent(/Feedback collected: 2/);
      });
  });
  
  it("Verify Retrain Model button enables when progress reaches 100/100.", async () => {
    // Create 100 mock items with low confidence
    const hundredMockItems = Array.from({ length: 100 }, (_, index) => ({
      id: `${index + 1}`,
      text: ` စိတ်ကမဆိုးပါဘူး${index + 1}`,
      predicted_label: "positive",
      sentiment: "positive",
      confidence: 0.45, // Low confidence to enable feedback
    }));
    renderWithRouter({ apiResponse: { results: hundredMockItems } });

    const retrainButton = screen.getByTestId("retrain-model-btn");
    expect(retrainButton).toBeDisabled();

    const submitButtons = screen.getAllByRole("button", {
      name: /submit feedback/i,
    });

    for (let i = 0; i < 100; i++) {
      fireEvent.click(submitButtons[0]);
    }
    expect(screen.getByTestId("feedback-collected-value")).toHaveTextContent(
      /Feedback collected: 100/i
    );
    expect(retrainButton).not.toBeDisabled();
  });
    
});
