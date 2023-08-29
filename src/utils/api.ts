export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response) {
    throw new Error('Network error!');
  }

  const data = (await response.json()) as T;
  return data;
}
