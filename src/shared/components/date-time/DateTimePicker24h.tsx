"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/shared/utils/tailwind-utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

interface DateTimePicker24hProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DateTimePicker24h({
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  className,
}: DateTimePicker24hProps) {
  const handleDateSelect = (date: Date | undefined) => {
    if (date && onChange) {
      onChange(date);
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal hover:bg-inherit hover:text-inherit cursor-pointer bg-inherit",
              !value && "text-muted-foreground"
            )}
          >
            {value ? format(value, "MM/dd/yyyy") : placeholder}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
