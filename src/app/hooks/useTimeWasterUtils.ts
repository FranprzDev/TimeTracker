import { useMemo } from "react";
import { IconType } from "react-icons";
import { Entry } from "@/app/types/types";
import { socialNetworks } from "../constants/constants";

interface UseTimeWasterUtils {
  getWeekKey: (date: Date) => string;
  getIcon: (networkName: string) => IconType | null;
  formatTime: (minutes: number) => string;
  calculateTotalTimeForPerson: (entries: Entry[], person: string) => number;
  groupEntriesByNetwork: (
    entries: Entry[],
    person: string
  ) => { [network: string]: number };
}

const useTimeWasterUtils = (): UseTimeWasterUtils => {
  const getWeekKey = (date: Date): string => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const startDate = new Date(d.getTime() - 3 * 86400000);
    const endDate = new Date(d.getTime() + 3 * 86400000);
    return `Semana ${startDate.getDate()} ${startDate.toLocaleString(
      "default",
      { month: "short" }
    )} / ${endDate.getDate()} ${endDate.toLocaleString("default", {
      month: "short",
    })}`;
  };

  const getIcon = (networkName: string): IconType | null => {
    const network = socialNetworks.find((n) => n.name === networkName);
    return network ? network.icon : null;
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours} hora${hours > 1 ? "s" : ""} ${remainingMinutes} minuto${
          remainingMinutes !== 1 ? "s" : ""
        }`
      : `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  };

  const calculateTotalTimeForPerson = (
    entries: Entry[],
    person: string
  ): number => {
    return entries
      .filter((entry) => entry.person === person)
      .reduce((total, entry) => total + entry.time, 0);
  };

  const groupEntriesByNetwork = (
    entries: Entry[],
    person: string
  ): { [network: string]: number } => {
    return entries
      .filter((entry) => entry.person === person)
      .reduce((acc, entry) => {
        acc[entry.network] = (acc[entry.network] || 0) + entry.time;
        return acc;
      }, {} as { [network: string]: number });
  };

  return useMemo(
    () => ({
      getWeekKey,
      getIcon,
      formatTime,
      calculateTotalTimeForPerson,
      groupEntriesByNetwork,
    }),
    []
  );
};

export default useTimeWasterUtils;
