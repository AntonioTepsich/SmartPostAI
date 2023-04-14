import os
import openai
import argparse
import re
from typing import List

MAX_INPUT_LENGTH =32

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--input","-i", type=str,required=True)
    args=parser.parse_args()
    user_input=args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError(f"La entrada es muy larga. Debe estar debajo de {MAX_INPUT_LENGTH}. Ingrese de input: {user_input}")

#Calculo el largo del prompt
def validate_length(prompt: str) -> bool:
    return len(prompt)<=MAX_INPUT_LENGTH



#Genero Hashtags
def generate_keywords(prompt: str) -> List[str]:
    # Cargo mi API kEY de OPENAI para utilizar ese servicio.
    openai.api_key = os.getenv("OPENAI_API_KEY")

    #Genero el prompt que entrego al modelo de IA.
    enriched_prompt = f"Generar palabras clave de marca relacionadas con {prompt}."
    print(enriched_prompt)

    #Genero la respuesta a partir del modelo con variables determinadas
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=enriched_prompt,
        temperature=0.8,
        max_tokens=45,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    #Extraigo texto de la respuesta 
    keywords_text:str = response["choices"][0]["text"]

    #Separo con espacios
    keywords_text=keywords_text.strip()
    keyword_array=re.split(",|\n|;|-",keywords_text)
    keyword_array=[k.lower().strip() for k in keyword_array] 
    keyword_array=[k for k in keyword_array if len(k)>0]

    print(f"Keywords: {keyword_array}")

    return keyword_array

#Genero el pie de Post
def generate_branding_snippet(prompt: str) -> str:
    # Cargo mi API kEY de OPENAI para utilizar ese servicio.
    openai.api_key = os.getenv("OPENAI_API_KEY")

    #Genero el prompt que entrego al modelo de IA.
    enriched_prompt = f"Generar un fragmento de marca optimista para un post de instagram que es sobre {prompt} y que tenga como maximo de largo {MAX_INPUT_LENGTH} caracteres, sin hashtags y puede ser con emogis."
    print(enriched_prompt)

    #Genero la respuesta a partir del modelo con variables determinadas
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=enriched_prompt,
        temperature=0.8,
        max_tokens=60,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    
    #Extraigo texto de la respuesta 
    branding_text:str = response["choices"][0]["text"]

    #Separo con espacios
    branding_text=branding_text.strip()

    #agrego ... si no termina la oracion ahi
    last_char=branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text+="..."

    print(f"Snippet: {branding_text}")
    return branding_text

if __name__ == "__main__":
    main()