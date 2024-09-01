import React from "react";
import { Topic } from "@/constants/Topic";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/atoms/ui/toggle-group";

interface TopicsProfileProps {
  topics: string[];
  setData: (updatedTopics: string[]) => void;
  edit?: boolean;
}

const TopicsProfile: React.FC<TopicsProfileProps> = ({
  topics,
  setData,
  edit = true,
}) => {
  const handleChange = (updatedTopics: string[]) => {
    if (edit) {
      console.log("UPD: ", updatedTopics);
      setData(updatedTopics);
      console.log(updatedTopics);
    }
  };

  return (
    <div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={topics || []}
        onValueChange={handleChange}
        className="flex flex-wrap gap-2"
      >
        {Topic.map((topic, x) => (
          <ToggleGroupItem
            key={x}
            value={topic}
            disabled={!edit}
            className={`
              ${
                topics?.includes(topic)
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
              ${!edit && "cursor-not-allowed opacity-50"}
              px-3 py-2 rounded-md text-sm
            `}
          >
            {topic}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default TopicsProfile;
