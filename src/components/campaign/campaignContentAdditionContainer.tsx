import React, { useState, useEffect } from "react";
import styles from "../../styles/components/campaign/campaignContentAdditionContainer.module.css";
import PageButton from "@/components/page/pageButton";
import PageButtonSmall from "@/components/page/PageButtonSmall";
import PageSelectionMenu from "@/components/page/pageSelectionMenu";
import ServicesSelectionContainer from "@/components/services/servicesSelectionContainer";
import CampaignContentAdditionPostsContainer from "@/components/campaign/campaignContentAdditionPostsContainer";
import CampaignAdditionStyleSelector from "@/components/campaign/campaignAdditionStyleSelector";
import { useRouter } from "next/navigation";

interface CampaignContentContainerProps {
    productId: string;
    campaignId: string;
    userId: string;
}

interface RawPost {
    title: string;
    content: string;
}

interface Post {
    id: string;
    site: string;
    title: string;
    text: string;
}

const CampaignContentAdditionContainer: React.FC<CampaignContentContainerProps> = ({ campaignId, userId, productId }) => {
    const router = useRouter();
    const [hasContentBeenCreated, setHasContentBeenCreated] = useState(false);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [topic, setTopic] = useState("");
    const [goal, setGoal] = useState("");
    const [remarks, setRemarks] = useState("");
    const [hasRedditBeenSelected, setHasRedditBeenSelected] = useState(false);
    const [selectedSubReddits, setSelectedSubReddits] = useState<number[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
    const services = [
        { id: 1, name: "Product Hunt" },
        { id: 2, name: "Makerlog" },
        { id: 3, name: "Product Hunt" },
        { id: 4, name: "Makerlog" },
        { id: 5, name: "devRant" },
        { id: 6, name: "dev.io" },
        { id: 7, name: "Hacker News" },
        { id: 8, name: "Spiceworks" },
        { id: 9, name: "Indie Hackers" },
        { id: 10, name: "devcord" },
        { id: 11, name: "Reddit" },
        { id: 12, name: "Twitter" },
        { id: 13, name: "Facebook" },
        { id: 14, name: "LinkedIn" },
        { id: 15, name: "GitHub" },
        { id: 16, name: "Stack Overflow" },
        { id: 17, name: "Quora" },
        { id: 18, name: "Hacker Noon" },
        { id: 19, name: "CodePen" },
    ];

    const subreddits = [
        { id: 1, name: "r/learnprogramming" },
        { id: 2, name: "r/webdev" },
        { id: 3, name: "r/tech" },
        { id: 4, name: "r/AskScience" },
        { id: 5, name: "r/devRant" },
        { id: 6, name: "r/dev.io" },
        { id: 7, name: "r/HackerNews" },
        { id: 8, name: "r/Spiceworks" },
        { id: 9, name: "r/IndieHackers" },
        { id: 10, name: "r/devcord" }
    ];

    const options = [
        { id: 1, name: "SOCIAL MEDIA" },
        { id: 2, name: "DEVELOPER" },
        { id: 3, name: "CREATE CUSTOM" },
    ];

    const options2 = [
        { id: 1, name: "DEVELOPER" },
        { id: 3, name: "CREATE CUSTOM" },
    ];

    const handleServiceChange = (option: string) => {
        switch (option) {
            case "SOCIAL MEDIA":
                setSelectedServices(
                    services
                        .filter((s) => ["Twitter", "Facebook", "LinkedIn", "Reddit"].includes(s.name))
                        .map((s) => s.id)
                );
                handleSpecificServiceSelect("Reddit")
                break;
            case "DEVELOPER":
                setSelectedServices(
                    services
                        .filter((s) => ["GitHub", "Stack Overflow", "CodePen"].includes(s.name))
                        .map((s) => s.id)
                );
                break;
            case "CREATE CUSTOM":
                console.log("Custom route");
                router.push("/site-selection-creation");
                break;
            default:
                break;
        }
    };

    const handleSubRedditChange = (option: string) => {
        switch (option) {
            case "CREATE CUSTOM":
                console.log("Custom route");
                router.push("/site-selection-creation");
                break;

            default:
                break;
        }
    };

    const selectAllServices = () => {
        setSelectedServices(services.map((service) => service.id));
    };

    const selectNoServices = () => {
        setSelectedServices([]);
    };

    const selectAllSubReddits = () => {
        setSelectedSubReddits(subreddits.map((subreddits) => subreddits.id));
    };

    const selectNoSubReddits = () => {
        setSelectedSubReddits([]);
    };

    const createContent = () => {
        console.log("create content");
        setHasContentBeenCreated(!hasContentBeenCreated);
    };

    const resetContent = () => {
        setSelectedServices([]);
        setTopic("");
        setGoal("");
        setRemarks("");
        setHasRedditBeenSelected(false);
    };

    const handleSpecificServiceSelect = (serviceName: string) => {
        if (serviceName === "Reddit") {
            setHasRedditBeenSelected(true);
            console.log("Reddit has been selected! Performing a specific action...");
        }
        if (serviceName === "Facebook") {
            console.log("Facebook has been selected! Trigger another action...");
        }
    };

    const onReset = () => {
        resetContent()
        setHasContentBeenCreated(false)
        setHasRedditBeenSelected(false)
    }

    useEffect(() => {
        const redditServiceId = 11;
        setHasRedditBeenSelected(selectedServices.includes(redditServiceId));
    }, [selectedServices]);

    const handleDelete = (id: string) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    const generateContent = async () => {
        const servicesDict: Record<string, boolean> = {};

        selectedServices.forEach((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            if (service) {
                servicesDict[service.name] = true;
            }
        });

        selectedSubReddits.forEach((subredditId) => {
            const subreddit = subreddits.find((s) => s.id === subredditId);
            if (subreddit) {
                servicesDict[subreddit.name] = true;
            }
        });

        if (Object.keys(servicesDict).length === 0) return;

        const response = await fetch("/api/postDetails/createPosts", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                campaignId: campaignId,
                userId: userId,
                productId: productId,
                services: servicesDict,
                sscop: false,
                cpop: false,
                sspop: false,
                ppsop: false,
            }),
        })

        if (!response.ok) {
            console.log("Error creating content");
        }

        const data = await response.json();
        const rawPosts = data.posts;

        const posts2: Post[] = Object.entries(rawPosts as Record<string, RawPost>).map(
            ([site, post], index) => ({
                id: (index + 1).toString(),
                site,
                title: post.title,
                text: post.content,
            })
        );

        setPosts(posts2);
        console.log("content created");
        setHasContentBeenCreated(true);
    }

    const handleSave = (id: string, newTitle: string, newText: string) => {
        setPosts(
            posts.map((post) =>
                post.id === id
                    ? { ...post, title: newTitle, text: newText }
                    : post
            )
        );
    };

    return (
        <div className={styles.campaignContentAdditionContainer}>
            <div className={styles.campaignContentAdditionTitle}>
                CREATE NEW CONTENT FOR THIS CAMPAIGN
            </div>
            <div className={styles.campaignContentAddition}>
                <div className={styles.campaignContentAdditionBody}>
                    <div className={styles.label}>TOPIC:</div>
                    <input
                        type="text"
                        className={styles.value}
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter topic"
                    />

                    <div className={styles.label}>GOAL:</div>
                    <input
                        type="text"
                        className={styles.value}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Enter goal"
                    />

                    <div className={styles.label}>SITES:</div>
                    <div className={styles.valueSelection}>
                        <div className={styles.campaignContentSelectionButtons}>
                            <PageButtonSmall label={"ALL"} onClick={selectAllServices} />
                            <PageSelectionMenu options={options} onSelection={handleServiceChange} />
                            <PageButtonSmall label={"NONE"} onClick={selectNoServices} />
                        </div>
                        <ServicesSelectionContainer
                            services={services}
                            selectedServices={selectedServices}
                            onSelectionChange={setSelectedServices}
                            onServiceSelect={handleSpecificServiceSelect}
                        />
                    </div>

                    {hasRedditBeenSelected && (
                        <>
                            <div className={styles.label}>SUBREDDITS:</div>
                            <div className={styles.valueSelection}>
                                <div className={styles.campaignContentSelectionButtons}>
                                    <PageButtonSmall label={"ALL"} onClick={selectAllSubReddits}/>
                                    <PageSelectionMenu options={options2} onSelection={handleSubRedditChange}/>
                                    <PageButtonSmall label={"NONE"} onClick={selectNoSubReddits}/>
                                </div>
                                <ServicesSelectionContainer
                                    services={subreddits}
                                    selectedServices={selectedSubReddits}
                                    onSelectionChange={setSelectedSubReddits}
                                    onServiceSelect={handleSpecificServiceSelect}
                                />
                            </div>
                        </>
                    )}
                    
                    <div className={styles.label}>STYLE:</div>
                    <CampaignAdditionStyleSelector selectedStyle={selectedStyle} />
                    
                    <div className={styles.label}>REMARKS:</div>
                    <input
                        type="text"
                        className={styles.value}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Enter remarks"
                    />
                </div>
                {!hasContentBeenCreated && (
                    <div className={styles.campaignContentAdditionContainerButtons}>
                        <PageButton label={"RESET INPUT"} onClick={resetContent}/>
                        <PageButton label={"CREATE YOUR OWN POSTS"} onClick={createContent}/>
                        <PageButton label={"GENERATE POSTS"} onClick={generateContent}/>
                    </div>
                )}
                {hasContentBeenCreated &&
                    <div className={styles.campaignContentAdditionPosts}>
                        <CampaignContentAdditionPostsContainer
                            posts={posts}
                            onReset={onReset}
                            onDelete={handleDelete}
                            onSave={handleSave}
                            setPosts={setPosts}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default CampaignContentAdditionContainer;
