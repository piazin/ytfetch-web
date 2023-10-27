import React from "react";
import { IFormat } from "@/types/VideoDetails";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

interface SelectFormatProps {
  value: string;
  formats: IFormat[];
  onValueChange: (value: string) => void;
}

export const SelectFormat = ({
  formats,
  value,
  onValueChange,
}: SelectFormatProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="text-zinc-800  border-purple-700 w-full">
        <SelectValue placeholder="Selecionar qualidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Qualidade</SelectLabel>
          {formats.map((format) => (
            <SelectItem
              value={format.qualityLabel + "-" + format.container}
              key={format.width}
            >
              {format.qualityLabel} - {format.container}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
