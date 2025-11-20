import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "@/lib/api";

export function useMeals(query: string) {
  return useQuery({
    queryKey: ["meals", query],
    queryFn: () => fetchMeals(query),
  });
}
