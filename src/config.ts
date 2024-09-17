import fs from 'fs';
import path from 'path';



interface Config {
  GENERAL: {
    PORT: number;
    SIMILARITY_MEASURE: string;
  };
  API_KEYS: {
    OPENAI: string;
    GROQ: string;
    ANTHROPIC: string;
  };
  API_ENDPOINTS: {
    SEARXNG: string;
    OLLAMA: string;
    OPENAI: string;
  };
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};


export const getPort = () => process.env.PORT //|| loadConfig().GENERAL.PORT;

export const getSimilarityMeasure = () =>
  process.env.SIMILARITY_MEASURE //|| loadConfig().GENERAL.SIMILARITY_MEASURE;

export const getOpenaiBaseUrl = () => process.env.OPENAI_BASE_URL //|| loadConfig().API_ENDPOINTS.OPENAI;

export const getOpenaiApiKey = () => process.env.OPENAI_API_KEY //|| loadConfig().API_KEYS.OPENAI;

export const getGroqApiKey = () => process.env.GROQ_API_KEY //|| loadConfig().API_KEYS.GROQ;

export const getAnthropicApiKey = () => process.env.ANTHROPIC_API_KEY //|| loadConfig().API_KEYS.ANTHROPIC;

export const getSearxngApiEndpoint = () =>
  process.env.SEARXNG_API_URL // || loadConfig().API_ENDPOINTS.SEARXNG;

export const getOllamaApiEndpoint = () => process.env.OLLAMA_API_URL //|| loadConfig().API_ENDPOINTS.OLLAMA;


