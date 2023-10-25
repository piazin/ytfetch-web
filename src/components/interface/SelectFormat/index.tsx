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

type SelectFormatProps = {
  formats: IFormat[];
};

export const SelectFormat = ({ formats }: SelectFormatProps) => {
  return (
    <Select>
      <SelectTrigger className="text-zinc-800  border-purple-700 w-full">
        <SelectValue placeholder="Selecionar qualidade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-black">Qualidade</SelectLabel>
          {formats.map((format) => (
            <SelectItem value={format.qualityLabel} key={format.width}>
              {format.qualityLabel} - {format.container}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
