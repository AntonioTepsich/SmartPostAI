import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image"
import logo from "../public/copykittLogo.svg"

const CopyKit: React.FC=()=> {

    const CHARACTERLIMIT=32;
    const ENDPOINT: string= "http://127.0.0.1:8000/generate_snippet_and_keywords";
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
        <div className="h-screen flex">
            <div className="max-w-md m-auto p-2">
                <div className="bg-black p-6 rounded-md text-white">
                    <div className="text-center my-3">
                        <h1 className=" mb-3 text-6xl font-semibold"><span className="text-6xl">&lt;</span>AT<span className="text-green-500">/</span><span className="text-6xl text-green-500">&gt;</span></h1>
                        <h2 className={gradientTextStyle + " text-3xl font-light"}>CopyKitt!</h2>
                        <div className={gradientTextStyle}>Su asistente de marca con IA.</div>
                    </div>
                    {displayedElement}
                </div>
                <div className="text-right ">@Antonio Tepsich</div>
            </div>
        </div>
    );
};

export default CopyKit;