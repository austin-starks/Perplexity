"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { BrainIcon, Rabbit, RabbitIcon } from "lucide-react";
import { useMessageStore } from "@/stores";
import { ChatModel } from "../../generated";

type Model = {
  name: string;
  description: string;
  value: string;
  smallIcon: React.ReactNode;
  icon: React.ReactNode;
};

const modelMap: Record<ChatModel, Model> = {
  [ChatModel.GPT_3_5_TURBO]: {
    name: "Fast",
    description: "OpenAI/GPT-3.5-turbo",
    value: ChatModel.GPT_3_5_TURBO,
    smallIcon: <RabbitIcon className="w-4 h-4 text-cyan-500" />,
    icon: <RabbitIcon className="w-5 h-5 text-cyan-500" />,
  },
  [ChatModel.GPT_4O]: {
    name: "Powerful",
    description: "OpenAI/GPT-4o",
    value: ChatModel.GPT_4O,
    smallIcon: <BrainIcon className="w-4 h-4 text-pink-500" />,
    icon: <BrainIcon className="w-5 h-5 text-pink-500" />,
  },
  [ChatModel.LLAMA_3_70B]: {
    name: "Hyper",
    description: "Groq/LLaMA3-70B",
    value: ChatModel.LLAMA_3_70B,
    smallIcon: <LightningBoltIcon className="w-4 h-4 text-yellow-500" />,
    icon: <LightningBoltIcon className="w-5 h-5 text-yellow-500" />,
  },
};

const ModelItem: React.FC<{ model: Model }> = ({ model }) => (
  <SelectItem
    key={model.value}
    value={model.value}
    className="flex flex-col items-start p-2"
  >
    <div className="flex items-center space-x-2">
      {model.icon}
      <div className="flex flex-col">
        <span className="font-bold">{model.name}</span>
        <span className="text-muted-foreground">{model.description}</span>
      </div>
    </div>
  </SelectItem>
);

export function ModelSelection() {
  const { model, setModel } = useMessageStore();
  return (
    <Select
      defaultValue={model}
      onValueChange={(value) => {
        if (value) {
          setModel(value as ChatModel);
        }
      }}
    >
      <SelectTrigger className="w-fit space-x-2 bg-transparent outline-none border-none select-none focus:ring-0 shadow-none transition-all duration-200 ease-in-out hover:scale-[1.05] text-sm">
        <SelectValue>
          <div className="flex items-center space-x-2">
            {modelMap[model].smallIcon}
            <span className="font-semibold">{modelMap[model].name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[300px]">
        <SelectGroup>
          {Object.values(modelMap).map((model) => (
            <ModelItem key={model.value} model={model} />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
