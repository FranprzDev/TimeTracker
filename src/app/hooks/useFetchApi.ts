import { Entry } from "@/app/types/types";

interface UseFetchApi {
  fetchEntries: () => Promise<Entry[]>;
  createEntry: (entry: Entry) => Promise<{ data: Entry }>;
}

const useFetchApi = (): UseFetchApi => {
  const fetchEntries = async (): Promise<Entry[]> => {
    const response = await fetch("/api/saveData", {
      method: "GET",
    });
    const result = await response.json();
    return result.data;
  };

  const createEntry = async (entry: Entry): Promise<{ data: Entry }> => {
    const response = await fetch("/api/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const result = await response.json();
    return result;
  };

  return {
    fetchEntries,
    createEntry,
  };
};

export default useFetchApi;
