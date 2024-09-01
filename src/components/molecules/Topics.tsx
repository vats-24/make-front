import React, { useState } from "react";
import { Topic } from "@/constants/Topic";
import { ToggleGroup, ToggleGroupItem } from "@/components/atoms/ui/toggle-group";

interface TopicsProps {
  topics: string[];
  setData: React.Dispatch<React.SetStateAction<any>>; 
}

const Topics: React.FC<TopicsProps> = ({ topics, setData }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(Array.isArray(topics) ? topics : []);

  const handleChange = (updatedTopics: string[]) => {
    setSelectedTopics(updatedTopics);
    setData((prevData: any) => ({ ...prevData, expertise: updatedTopics })); 
    console.log("Updated Topics:", updatedTopics);
  };

  return (
    <div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={selectedTopics}
        onValueChange={handleChange}
        className="flex flex-wrap gap-2"
      >
        {Topic.map((topic, index) => (
          <ToggleGroupItem
            key={index}
            value={topic}
            className={`
              ${selectedTopics.includes(topic) ? "bg-primary text-primary-foreground" : ""}
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

export default Topics;
