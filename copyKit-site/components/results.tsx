interface ResutlsProps{
    snippet: string;
    prompt: string;
    keywords: string[];
    onBack: any;
}

const Results: React.FC<ResutlsProps>=(props)=>{

    const keywordElement=[];
    for(let i = 0; i< props.keywords.length;i++){
        const element= <div key={i}>#{props.keywords[i]}</div>;
        keywordElement.push(element);
    }
    return (
    <>
        <div>
            <div>
                <div>
                    <b>Your Prompt</b>
                </div>
                <div>{props.prompt}</div>
            </div>
            <div>
                <div>
                    <b>Snippet</b>
                </div>
                <div>{props.snippet}</div>
            </div>
            <div>
                <div>
                    <b>keywords</b>
                </div>
                <div>{keywordElement}</div>
            </div>
        </div>
            <button onClick={props.onBack}>Volver</button>
    </>)
}

export default Results;