import { useMemo } from "react";

export default function useToday() {
  const today = useMemo(() => new Date(), []); // 최초 렌더링 시에만

  const dateString = useMemo(() => {
    return today.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [today]); // 날짜

  const dayName = useMemo(() => {
    return today.toLocaleString("en-US", { weekday: "short" });
  }, [today]); // 요일

  return { today, dateString, dayName };
}
