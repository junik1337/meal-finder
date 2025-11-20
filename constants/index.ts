export function countryToFlag(country: string): string {
  const code = getCountryCode(country);
  if (!code) return "🌍"; // fallback

  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

function getCountryCode(area: string): string | null {
  const map: Record<string, string> = {
    American: "US",
    British: "GB",
    Canadian: "CA",
    Chinese: "CN",
    Croatian: "HR",
    Dutch: "NL",
    Egyptian: "EG",
    French: "FR",
    Greek: "GR",
    Indian: "IN",
    Irish: "IE",
    Italian: "IT",
    Jamaican: "JM",
    Japanese: "JP",
    Kenyan: "KE",
    Malaysian: "MY",
    Mexican: "MX",
    Moroccan: "MA",
    Polish: "PL",
    Portuguese: "PT",
    Russian: "RU",
    "Saudi Arabian": "SA",
    Spanish: "ES",
    Thai: "TH",
    Tunisian: "TN",
    Turkish: "TR",
    Vietnamese: "VN",
    Argentinian: "AR",
    Filipino: "PH",
  };

  return map[area] || null;
}

export function parseInstructions(raw: string): string[] {
  if (!raw) return [];

  // Split it like: "STEP 1", numbered lines, or just newlines
  const stepRegex = /(?:STEP\s*\d+[:\s]*|^\d+[\.\)]\s*)/gim;

  let steps = raw.split(stepRegex).filter((s) => s.trim() !== "");

  if (steps.length <= 1) {
    steps = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l !== "");
  }

  return steps
    .map((step) => step.replace(/^[\d\.\)\s]+/, "").trim())
    .filter((step) => step.length > 0);
}
