interface FormProps{
    prompt:string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}

const Form: React.FC<FormProps>=(props)=>{

    const isPromptAtLimit=props.prompt.length<=props.characterLimit;
    const updateProptValue = (text: string)=>{
        if(text.length<=props.characterLimit){
            props.setPrompt(text);
        }
    }
    return (
        <>
        <p>Dígame de qué se trata su marca y generaré textos y palabras clave para usted.</p>
        <div></div>
        <input 
            type="text" 
            placeholder="coffee" 
            value={props.prompt}
            onChange={(e)=> updateProptValue(e.currentTarget.value)}>
        </input>
        <div>{props.prompt.length}/32</div>
        <button onClick={props.onSubmit} disabled={!isPromptAtLimit || props.isLoading}>Subir</button>
        </>
    )
}

export default Form;