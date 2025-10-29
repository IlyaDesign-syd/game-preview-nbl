import { useQuery } from "@tanstack/react-query";
import type { MatchFixture } from "../types/MatchFixture";

export const useMatches = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res = await fetch("/api/matches");
      if (!res.ok) throw new Error("Failed to fetch matches");
      const data : MatchFixture[] = await res.json();
      return data.slice(0, 30); // limit to first 30
    },
  });
};
