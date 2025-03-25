import { describe, it, expect, vi, afterEach, Mock } from "vitest";
import { getResult, getSuggestion } from "./search.api";
import { axiosInstance } from "../config/axiosInstance";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

vi.mock("../config/axiosInstance", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe("search.api", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch query result correctly", async () => {
    const mockData = { message: "result data" };
    const mockedResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {},
        method: "get",
        url: "",
      } as InternalAxiosRequestConfig,
    };

    (axiosInstance.get as Mock).mockResolvedValue(mockedResponse);

    const result = await getResult();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
    );
    expect(result).toEqual(mockData);
  });

  it("should fetch suggestion correctly", async () => {
    const mockData = { message: "suggestion data" };
    const mockedResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: {},
        method: "get",
        url: "",
      } as InternalAxiosRequestConfig,
    };

    (axiosInstance.get as Mock).mockResolvedValue(mockedResponse);

    const result = await getSuggestion();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json"
    );
    expect(result).toEqual(mockData);
  });
});
