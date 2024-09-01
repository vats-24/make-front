import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/atoms/ui/select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo, useState } from "react";

interface TimeSlot {
  start: string | null;
  end: string | null;
}

interface Availability {
  [key: number]: TimeSlot[];
}

interface WeekdayTimePickerProfileProps {
  data: Array<{ day: number; slots: string[] }>;
  setData: (availabilityData: Array<{ day: number; slots: string[] }>) => void;
  edit?: boolean;
}

const WeekdayTimePickerProfile: React.FC<WeekdayTimePickerProfileProps> = ({
  data,
  setData,
  edit = true,
}) => {
  const [availability, setAvailability] = useState<Availability>({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data?.length) {
      const newAvailability: Availability = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      data.forEach((item) => {
        newAvailability[item.day] = item.slots.map((slot) => {
          const [start, end] = slot.split("-");
          return { start, end };
        });
      });
      console.log(data);
      setAvailability(newAvailability);
    }
  }, [data]);

  const generateTimes = () => {
    const times: Array<{ value: string; label: string }> = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        const label = `${hour % 12 || 12}:${minute
          .toString()
          .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
        times.push({ value: time, label });
      }
    }
    return times;
  };

  const times = useMemo(() => generateTimes(), []);

  const handleTimeChange = React.useCallback(
    (day: number, index: number, startOrEnd: keyof TimeSlot, value: string) => {
      const newAvailability = { ...availability };
      newAvailability[day][index][startOrEnd] = value;

      // Check for overlapping times
      const dayTimes = newAvailability[day];
      const overlappingTimes = dayTimes.filter(
        (time, i) =>
          i !== index &&
          ((time.start! >= dayTimes[index].start! &&
            time.start! < dayTimes[index].end!) ||
            (time.end! > dayTimes[index].start! &&
              time.end! <= dayTimes[index].end!)),
      );

      if (overlappingTimes.length > 0) {
        setError("Time overlaps with another slot");
      } else if (dayTimes[index].start === dayTimes[index].end) {
        setError("Start time and end time cannot be the same");
      } else if (dayTimes[index].start! > dayTimes[index].end!) {
        setError("Start time should not be greater than end time");
      } else {
        setError("");
        setAvailability(newAvailability);
        const availabilityData = getAvailabilityData(newAvailability);
        setData(availabilityData);
      }
    },
    [availability, setData],
  );

  const getAvailabilityData = React.useCallback(
    (availabilityState: Availability = availability): Array<{ day: number; slots: string[] }> => {
      const availabilityData: Array<{ day: number; slots: string[] }> = [];
  
      Object.entries(availabilityState).forEach(([day, slots]) => {
        if (slots.length > 0) {
          const formattedSlots = (slots as TimeSlot[]).map(
            ({ start, end }) => `${start}-${end}`,
          );
          availabilityData.push({
            day: parseInt(day, 10),
            slots: formattedSlots,
          });
        }
      });
  
      return availabilityData;
    },
    [availability],
  );
  

  const addTimeSlot = React.useCallback(
    (day: number) => {
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        [day]: [...prevAvailability[day], { start: null, end: null }],
      }));
    },
    [setAvailability],
  );

  const removeTimeSlot = React.useCallback(
    (day: number, index: number) => {
      setAvailability((prevAvailability) => {
        const updatedDay = prevAvailability[day].filter((_, i) => i !== index);
        const newAvailability = {
          ...prevAvailability,
          [day]: updatedDay,
        };
        const availabilityData = getAvailabilityData(newAvailability);
        setData(availabilityData);
        return newAvailability;
      });
      setError("");
    },
    [setData, getAvailabilityData],
  );

  const toggleDay = React.useCallback(
    (day: number) => {
      setAvailability((prevAvailability) => {
        const newAvailability = {
          ...prevAvailability,
          [day]:
            prevAvailability[day].length === 0
              ? [{ start: null, end: null }]
              : [],
        };
        const availabilityData = getAvailabilityData(newAvailability);
        setData(availabilityData);

        return newAvailability;
      });
    },
    [setData, getAvailabilityData],
  );

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-2 rounded-2xl border">
        {Object.entries(availability).map(([day, timeslots]) => (
          <div key={day}>
            <div className="flex flex-row justify-between space-y-5 my-1">
              <div className="flex items-center justify-between w-full p-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={timeslots.length > 0}
                    onChange={() => toggleDay(Number(day))}
                    disabled={!edit}
                  />
                  <span className="text-md font-light">
                    {
                      [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ][Number(day)]
                    }
                  </span>
                </div>

                <div className="flex flex-col gap-y-3 w-2/3">
                  <div className="flex flex-row items-center space-x-2">
                    {timeslots.length > 0 && (
                      <div className="flex justify-between w-full">
                        <div className="relative w-[32%]">
                          <Select
                            onValueChange={(value) =>
                              handleTimeChange(Number(day), 0, "start", value)
                            }
                            disabled={!edit}
                          >
                            <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                              <span>
                                {timeslots[0].start
                                  ? times.find(
                                      (t) => t.value === timeslots[0].start,
                                    )?.label || timeslots[0].start
                                  : "from"}
                              </span>
                              <ChevronDownIcon className="ml-1 h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent className="z-10">
                              {times.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="relative w-[32%]">
                          <Select
                            onValueChange={(value) =>
                              handleTimeChange(Number(day), 0, "end", value)
                            }
                            disabled={!edit}
                          >
                            <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                              <span>
                                {timeslots[0].end
                                  ? times.find(
                                      (t) => t.value === timeslots[0].end,
                                    )?.label || timeslots[0].end
                                  : "to"}
                              </span>
                              <ChevronDownIcon className="ml-1 h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent className="z-10">
                              {times.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center">
                          {timeslots.length > 0 && (
                            <button
                              className={`rounded-md px-2 py-1 text-sm font-medium text-white ${
                                error
                                  ? "bg-red-500 cursor-not-allowed"
                                  : "bg-primary"
                              }`}
                              onClick={() => addTimeSlot(Number(day))}
                              disabled={!!error || !edit}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {timeslots.length > 1 &&
                    timeslots.slice(1).map((_: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-row items-center justify-between space-x-2"
                      >
                        <div className="flex justify-between w-full">
                          <div className="relative w-[32%]">
                            <Select
                              onValueChange={(value) =>
                                handleTimeChange(
                                  Number(day),
                                  index + 1,
                                  "start",
                                  value,
                                )
                              }
                              disabled={!edit}
                            >
                              <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                                <span>
                                  {timeslots[index + 1].start
                                    ? times.find(
                                        (t) =>
                                          t.value === timeslots[index + 1].start,
                                      )?.label || timeslots[index + 1].start
                                    : "from"}
                                </span>
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                              </SelectTrigger>
                              <SelectContent className="z-10">
                                {times.map(({ value, label }) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="relative w-[32%]">
                            <Select
                              onValueChange={(value) =>
                                handleTimeChange(
                                  Number(day),
                                  index + 1,
                                  "end",
                                  value,
                                )
                              }
                              disabled={!edit}
                            >
                              <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                                <span>
                                  {timeslots[index + 1].end
                                    ? times.find(
                                        (t) => t.value === timeslots[index + 1].end,
                                      )?.label || timeslots[index + 1].end
                                    : "to"}
                                </span>
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                              </SelectTrigger>
                              <SelectContent className="z-10">
                                {times.map(({ value, label }) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center">
                            <button
                              className="rounded-md bg-red-500 px-2 py-1 text-sm font-medium text-white"
                              onClick={() =>
                                removeTimeSlot(Number(day), index + 1)
                              }
                              disabled={!edit}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdayTimePickerProfile;
