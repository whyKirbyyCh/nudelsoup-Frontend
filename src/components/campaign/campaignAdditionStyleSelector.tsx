import React, { useState } from "react";
import styles from "../../styles/components/campaign/campaignAdditionStyleSelector.module.css";
import { useRouter } from "next/navigation";

interface CampaignAdditionStyleSelectorProps {
    selectedStyle: string[];
}

const CampaignAdditionStyleSelector: React.FC<CampaignAdditionStyleSelectorProps> = ({ selectedStyle }) => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState<string>("");
    const [tags, setTags] = useState<string[]>([...selectedStyle, "Tag1"]);

    const handleTagClick = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            e.preventDefault();
            setTags(tags.slice(0, -1));
        }
    };

    const handleInfoButtonClick = () => {
        router.push("/style-info");
    };

    return (
        <div className={styles.campaignAdditionStyleSelector}>
            <div className={styles.inputContainer}>
                <div className={styles.tagsArea}>
                    {tags.map((tag, index) => (
                        <span 
                            key={index} 
                            className={styles.tag}
                            onClick={() => handleTagClick(tag)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={styles.inputField}
                    placeholder="Write about your intended style and or add tags..."
                    rows={1}
                />
            </div>
            <div className={styles.tagList}>
                {["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6", "Tag7", "Tag8", "Tag9", "Tag10", "Tag11", "Tag12", "Tag13", "Tag14", "Tag15"]
                    .filter(tag => !tags.includes(tag))
                    .map((tag, index) => (
                        <button key={index} onClick={() => handleTagClick(tag)} className={styles.tagButton}>
                            {tag}
                        </button>
                    ))}
                <button className={styles.infoButton} onClick={handleInfoButtonClick}>
                    <span>ⓘ</span>
                </button>
            </div>
        </div>
    );
}

export default CampaignAdditionStyleSelector;