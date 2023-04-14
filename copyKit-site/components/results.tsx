interface ResutlsProps{
    snippet: string;
    prompt: string;
    keywords: string[];
    onBack: any;
}


const Results: React.FC<ResutlsProps>=(props)=>{
    
    const keywordElement=[];
    for(let i = 0; i< props.keywords.length;i++){
        const element= <div key={i} className="bg-green-500 p-1 text-gray-50 px-2 text-sm rounded-sm">#{props.keywords[i]}</div>;
        keywordElement.push(element);
    }

    const keywordElementsHolder = <div className="flex flex-wrap gap-2">{keywordElement}</div>
    const resultSection=(label:string, body:any) => {
        return(
            <div className="bg-gray-100 p-4 my-3 rounded-md">
                <div className="text-black text-sm font-bold mb-4">{label}</div>
                <div className="text-green-500 font-medium">{body}</div>
            </div>
        );
    }

    return (
    <>
        <div className="mb-6">
            {resultSection("Entrada", <div className="text-lg font-bold">{props.prompt}</div>)}
            {resultSection("Pie de Post", <div className="font-semibold">{props.snippet}</div>)}
            {resultSection("#Hashtags", keywordElementsHolder)}
        </div>
            <button className="bg-gradient-to-r from-gray-100 to-green-500 disabled:opacity-50 w-full p-2 rounded-md text-lg" onClick={props.onBack}>Volver</button>
    </>)
}

export default Results;