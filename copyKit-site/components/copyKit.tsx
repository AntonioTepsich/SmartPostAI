import React from "react";
import Form from "./form";
import Results from "./results";
import GitHubButton from 'react-github-btn'

const CopyKit: React.FC=()=> {

    const CHARACTERLIMIT=32;
    const ENDPOINT: string= "https://4nx1l84mua.execute-api.sa-east-1.amazonaws.com/prod/generate_snippet_and_keywords";
    const [prompt, setPrompt]=React.useState("");
    const [snippet, setSnippet]=React.useState("");
    const [keywords, setKeywords]=React.useState([]);
    const [hasResults, setHasResults]=React.useState(false);
    const [isLoading, setIsLoading]=React.useState(false);

    const onSubmit = () => {
        console.log("submitting: " + prompt)
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res)=>res.json())
        .then(onResult);
    };

    const onResult = (data:any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResults(true);
        setIsLoading(false);
    };

    const onReset = (data:any) => {
        setPrompt("");
        setHasResults(false);
        setIsLoading(false);
    };

    let displayedElement=null;
    if(hasResults==true){
        displayedElement = <Results snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt} />;
    }
    else{
        displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTERLIMIT} />
    }

    const gradientTextStyle="text-white text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-green-500 w-fit mx-auto"
    return (
        <div className="h-screen flex flex-col">
            <div className="max-w-md m-auto p-2 flex flex-col justify-between">
                <div className="bg-black p-6 rounded-md text-white">
                <div className="text-center my-3">
                    <h1 className="mb-3 text-6xl font-semibold">
                    <span className="text-6xl">&lt;</span>AT
                    <span className="text-green-500">/</span>
                    <span className="text-6xl text-green-500">&gt;</span>
                    </h1>
                    <h2 className={gradientTextStyle + " text-3xl font-light"}>
                    SmartPostAI!
                    </h2>
                    <div className={gradientTextStyle}>
                    Su asistente inteligente de publicaciones con IA.
                    </div>
                </div>
                {displayedElement}
                </div>
                <div className="flex justify-between my-2">
                    <GitHubButton href="https://linktr.ee/antoniotepsich" data-icon="octicon-issue-opened" data-color-scheme="no-preference: dark; light: light_high_contrast; dark: dark;" data-size="large" aria-label="Follow @AntonioTepsich">Antonio Tepsich</GitHubButton>
                    <GitHubButton href="https://github.com/AntonioTepsich/SmartPostAI" data-icon="octicon-star" data-color-scheme="no-preference: dark; light: light_high_contrast; dark: dark;" data-size="large" aria-label="Star AntonioTepsich/SmartPostAI on GitHub">Star</GitHubButton>
                </div>
            </div>
        </div>
    );
};

export default CopyKit;