interface ResutlsProps{
    snippet: string;
    prompt: string;
    keywords: string[];
    onBack: any;
}


const Results: React.FC<ResutlsProps>=(props)=>{
    
    const keywordElement=[];
    for(let i = 0; i< props.keywords.length;i++){
        const element= <div key={i} className="bg-teal-200 p-1 text-teal-700 px-2 text-sm rounded-sm">#{props.keywords[i]}</div>;
        keywordElement.push(element);
    }

    const keywordElementsHolder = <div className="flex flex-wrap gap-2">{keywordElement}</div>
    const resultSection=(label:string, body:any) => {
        return(
            <div className="bg-slate-700 p-4 my-3 rounded-md">
                <div className="text-slate-500 text-sm font-bold mb-4">{label}</div>
                <div>{body}</div>
            </div>
        );
    }

    return (
    <>
        <div className="mb-6">
            {resultSection("Prompt", <div className="text-lg font-bold">{props.prompt}</div>)}
            {resultSection("Branding Snippet", props.snippet)}
            {resultSection("keywords", keywordElementsHolder)}
        </div>
            <button className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg" onClick={props.onBack}>Volver</button>
    </>)
}

export default Results;