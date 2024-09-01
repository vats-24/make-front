import React, { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/atoms/ui/select";
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface TimeSlot {
  start: string | null;
  end: string | null;
}

interface Availability {
  [key: number]: TimeSlot[];
}

interface WeekdayTimePickerProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  edit?: boolean;
}

const WeekdayTimePicker: React.FC<WeekdayTimePickerProps> = ({ data, setData, edit = true }) => {
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
  const navigate = useNavigate();

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
      data.forEach((item: { day: number; slots: string[] }) => {
        newAvailability[item.day] = item.slots.map((slot: string) => {
          const [start, end] = slot.split("-");
          return { start, end };
        });
      });
      console.log(newAvailability);
      setAvailability(newAvailability);
    }
  }, [data]);

  const handleNext = async () => {
    const availabilityData = getAvailabilityData();
    console.log(data);
    const token = localStorage.getItem("accessToken");

    setData(async (prev: any) => {
      const updatedData = await { ...prev, availability: availabilityData };
      console.log(updatedData);
      await axios
        .post(
          "http://localhost:3000/api/users/user-details",
          {
            data: updatedData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
          navigate("/", { replace: true });
        });
    });
  };

  const generateTimes = (): { value: string; label: string }[] => {
    const times = [];
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
    (day: number, index: number, startOrEnd: "start" | "end", value: string) => {
      const newAvailability = { ...availability };
      newAvailability[day][index][startOrEnd] = value;

      // Check for overlapping times
      const dayTimes = newAvailability[day];
      const overlappingTimes = dayTimes.filter(
        (time, i) =>
          i !== index &&
          ((time.start && time.start >= dayTimes[index].start! &&
            time.start < dayTimes[index].end!) ||
            (time.end && time.end > dayTimes[index].start! &&
              time.end <= dayTimes[index].end!)),
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
      }
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
    [availability],
  );

  const removeTimeSlot = React.useCallback(
    (day: number, index: number) => {
      setAvailability((prevAvailability) => {
        const updatedDay = prevAvailability[day].filter((_, i) => i !== index);
        return {
          ...prevAvailability,
          [day]: updatedDay,
        };
      });
      setError("");
    },
    [availability],
  );

  const toggleDay = React.useCallback(
    (day: number) => {
      setAvailability((prevAvailability) => ({
        ...prevAvailability,
        [day]:
          prevAvailability[day].length === 0
            ? [{ start: null, end: null }]
            : [],
      }));
    },
    [availability],
  );

  const getAvailabilityData = React.useCallback(() => {
    const availabilityData: { day: number; slots: string[] }[] = [];
    Object.entries(availability).forEach(([day, slots]) => {
      if (slots.length > 0) {
        const formattedSlots = slots.map((slot: TimeSlot) => `${slot.start ?? ''}-${slot.end ?? ''}`);
        availabilityData.push({
          day: parseInt(day, 10),
          slots: formattedSlots,
        });
      }
    });
    return availabilityData;
  }, [availability]);

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
                    onChange={() => toggleDay(parseInt(day, 10))}
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
                      ][parseInt(day, 10)]
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
                              handleTimeChange(parseInt(day, 10), 0, "start", value)
                            }
                            disabled={!edit}
                          >
                            <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                              <span>
                                {timeslots[0].start
                                  ? `${
                                      times.find(
                                        (t) => t.value === timeslots[0].start,
                                      )?.label || timeslots[0].start
                                    }`
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
                              handleTimeChange(parseInt(day, 10), 0, "end", value)
                            }
                            disabled={!edit}
                          >
                            <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                              <span>
                                {timeslots[0].end
                                  ? `${
                                      times.find(
                                        (t) => t.value === timeslots[0].end,
                                      )?.label || timeslots[0].end
                                    }`
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
                              onClick={() => addTimeSlot(parseInt(day, 10))}
                              disabled={!!error}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {timeslots.length > 1 && (
                    <div className="flex flex-col w-full space-y-2">
                      {timeslots.slice(1).map((_time: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="relative w-[32%]">
                            <Select
                              onValueChange={(value) =>
                                handleTimeChange(parseInt(day, 10), index + 1, "start", value)
                              }
                              disabled={!edit}
                            >
                              <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                                <span>
                                  {timeslots[index + 1].start
                                    ? `${
                                        times.find(
                                          (t) =>
                                            t.value ===
                                            timeslots[index + 1].start,
                                        )?.label || timeslots[index + 1].start
                                      }`
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
                                handleTimeChange(parseInt(day, 10), index + 1, "end", value)
                              }
                              disabled={!edit}
                            >
                              <SelectTrigger className="rounded-md bg-muted px-2 py-1 text-sm font-light flex items-center h-[42px] justify-between">
                                <span>
                                  {timeslots[index + 1].end
                                    ? `${
                                        times.find(
                                          (t) =>
                                            t.value ===
                                            timeslots[index + 1].end,
                                        )?.label || timeslots[index + 1].end
                                      }`
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

                          <button
                            className="rounded-md px-2 py-1 text-sm font-medium text-white bg-red-500"
                            onClick={() => removeTimeSlot(parseInt(day, 10), index + 1)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {timeslots.length === 0 && (
                  <span className="text-sm text-gray-500">Unavailable</span>
                )}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {!edit ? (
        <></>
      ) : (
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white w-full"
          onClick={() => {
            handleNext();
          }}
          // disabled={error}
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default WeekdayTimePicker;