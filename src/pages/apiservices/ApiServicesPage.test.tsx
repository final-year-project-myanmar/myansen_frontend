import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ApiServicesPage from "@/pages/apiservices/ApiServicesPage";


// 1.Mock the api call that creates the key
// 2.Simulate user input(typing a new key name).
// 3.Trigger the creation action (e.g., clicking a button).
// 4.Assert that the success state occurs (like confirmation text or navigation).


// Mock Navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock api call for creating API key
// jest.mock('@/path/to/apiModule', () => ({
//   createApiKey: jest.fn(),
// }));
beforeEach(() => {
  jest.clearAllMocks();
  window.localStorage.clear();

    window.localStorage.setItem("access_token", "test-token-123");
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: async () => ({
        data: {
          key_name: "anything",
          key_value: "abcd-1234-efgh-5678",
          created_at: new Date().toISOString(),
          lastused_at: new Date().toISOString(),
          public_key: "pk_test_1234567890abcdef",
        },
      }),
    } as Response);
    
});
afterEach(() => {
  jest.resetAllMocks();
});

describe("Checks for creation of new API key with new key name", () => {

    it("should create a new API key when user put unique keyname which is not existed in the DB", async () => {
      //Arrange
      render(<ApiServicesPage />);
      let input = screen.getByTestId("api-keyname-input");
      let createButton = screen.getByRole("button", {
        name: /Generate Key/i,
      });

      //Act
      fireEvent.change(input, { target: { value: "anything" } });
      fireEvent.click(createButton);

      // Wait until both requests have happened
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

      const api_key_fetch = "http://127.0.0.1:8000/api_key";
      const api_create_url = "http://127.0.0.1:8000/api_key_creation";

      const fetchMock = global.fetch as jest.Mock;

      // 1st call: fetch existing keys
      const [firstUrl] = fetchMock.mock.calls[0];
      expect(firstUrl).toBe(api_key_fetch);
      // 2nd call: create the key
      const [secondUrl, secondInit] = fetchMock.mock.calls[1];
      expect(secondUrl).toBe(api_create_url);
      expect(secondInit).toMatchObject({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token-123",
        },
      });
      // 🔽 Only assert the POST body contains the key you care about
      const body = JSON.parse((secondInit as RequestInit).body as string);
      expect(body).toMatchObject({ key_name: "anything" });

      //Assert
      expect(await screen.findByText(/anything/i)).toBeInTheDocument();
    });
    it("should fail creation of new API key when user put the existed keyname ", async () => {

    });
});