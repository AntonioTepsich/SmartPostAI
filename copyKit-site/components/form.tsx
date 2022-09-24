interface FormProps{
    prompt:string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}

const Form: React.FC<FormProps>=(props)=>{

    const isPromptValid= props.prompt.length < props.characterLimit;
    const updateProptValue = (text: string)=>{
        if(text.length<=props.characterLimit){
            props.setPrompt(text);
        }
    }

    let statusColor="text-slate-100";
    let statusText=null;
    if(isPromptValid==false){
        statusColor="text-red-400"
        statusText=`Input must be less than ${props.characterLimit} characters.`
    }

    return (
        <>
        <div className="mb-6 text-green-500">
            <p>Dígame de qué se trata su marca y generaré textos y palabras claves para usted.</p>
        </div>
        <input 
            className="p-2 w-full rounded-md focus:outline-green-500 focus:outline text-slate-700"
            type="text" 
            placeholder="coffee" 
            value={props.prompt}
            onChange={(e)=> updateProptValue(e.currentTarget.value)}>
        </input>
        <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
            <div>{statusText}</div>
            <div>
                {props.prompt.length}/{props.characterLimit}</div>
            </div>
        <button className="bg-gradient-to-r from-gray-100	 to-green-500 disabled:opacity-50 w-full p-2 rounded-md text-lg" onClick={props.onSubmit} disabled={!isPromptValid || props.isLoading}>Subir</button>
        </>
    )
}

export default Form;