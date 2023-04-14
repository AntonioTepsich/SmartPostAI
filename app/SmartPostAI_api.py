from fastapi import FastAPI, HTTPException
from SmartPostAI import generate_branding_snippet, generate_keywords
from fastapi.middleware.cors import CORSMiddleware

from mangum import Mangum

app = FastAPI()
handler=Mangum(app)
MAX_INPUT_LENGTH =32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet= generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords= generate_keywords(prompt)
    return {"snippet": None,"keywords": keywords}

@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords(prompt: str):
    validate_input_length(prompt)
    snippet= generate_branding_snippet(prompt)
    keywords= generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

def validate_input_length(prompt: str):
    if len(prompt)>= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail=f"El imput es muy largo, debe tener como mucho {MAX_INPUT_LENGTH} caracteres.")
    pass

#codigo viejo que utilizaba para ejecutar este servidor sin AWS
# uvicorn SmartPostAI_api:app --reload