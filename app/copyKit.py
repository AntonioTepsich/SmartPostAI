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
        raise ValueError(f"La entrada es muy larga. Debe estar debajo de {MAX_INPUT_LENGTH}. Submitted input is {user_input}")

def validate_length(prompt: str) -> bool:
    return len(prompt)<=MAX_INPUT_LENGTH

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Genera palabras relacionadas a {prompt} para poner de hashtag en instagram (sin el hashtag)"
    print(enriched_prompt)

    response = openai.Completion.create(
        model="text-davinci-002", prompt=enriched_prompt, temperature=0, max_tokens=32
    )

    #extraigo texto
    keywords_text:str = response["choices"][0]["text"]

    #separo con espacios
    keywords_text=keywords_text.strip()
    keyword_array=re.split(",|\n|;|-",keywords_text)
    keyword_array=[k.lower().strip() for k in keyword_array]
    keyword_array=[k for k in keyword_array if len(k)>0]

    print(f"Keywords: {keyword_array}")

    return keyword_array

def generate_branding_snippet(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Genera un pie de post para instagram relacionada a {prompt}, para un emprendimiento, en español, en menos de 32 tokens:"
    print(enriched_prompt)
    response = openai.Completion.create(
        model="text-davinci-002", prompt=enriched_prompt, temperature=0, max_tokens=32
    )

    #extraigo texto
    branding_text:str = response["choices"][0]["text"]

    #separo con espacios
    branding_text=branding_text.strip()

    #agrego ... si no termina la oracion ahi
    last_char=branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text+="..."

    print(f"Snippet: {branding_text}")
    return branding_text

if __name__ == "__main__":
    main()