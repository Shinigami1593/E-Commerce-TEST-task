const API_BASE_URL = "https://fakestoreapi.com";

export async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const responseText = await response.text();
    if (responseText.trim() === "") {
      return null as T;
    }

    return JSON.parse(responseText) as T;
  }

  return (await response.json()) as T;
}