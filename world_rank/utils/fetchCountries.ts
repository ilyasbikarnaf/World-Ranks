export default async function fetchCountries() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const res = await fetch("https://restcountries.com/v3.1/all", {
      cache: "force-cache",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error("An Error Occurred during data fetching");

    return res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Fetch request was aborted due to timeout");
    } else {
      throw new Error("An Error Occurred during data fetching ");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
