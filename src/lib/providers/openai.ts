import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { getOpenaiApiKey,getOpenaiBaseUrl } from '../../config';
import logger from '../../utils/logger';

export const loadOpenAIChatModels = async () => {
  const openAIApiKey = getOpenaiApiKey();
  const openaiBaseUrl = getOpenaiBaseUrl();

  if (!openAIApiKey) return {};

  try {
    const chatModels = {
      'GPT-3.5 turbo': new ChatOpenAI({
        openAIApiKey,
        modelName: 'akjindal53244/Llama-3.1-Storm-8B',
        temperature: 0.7},
        {
          baseURL: openaiBaseUrl,
        }
      ),
      'GPT-4': new ChatOpenAI({
        openAIApiKey,
        modelName: 'akjindal53244/Llama-3.1-Storm-8B',
        temperature: 0.7},
        {
          baseURL: openaiBaseUrl,
        },
      ),
      'GPT-4 turbo': new ChatOpenAI({
        openAIApiKey,
        modelName: 'akjindal53244/Llama-3.1-Storm-8B',
        temperature: 0.7},
        {
          baseURL: openaiBaseUrl,
        },
      ),
      'GPT-4 omni': new ChatOpenAI({
        openAIApiKey,
        modelName: 'akjindal53244/Llama-3.1-Storm-8B',
        temperature: 0.7},
        {
          baseURL: openaiBaseUrl,
        },
      ),
      'GPT-4 omni mini': new ChatOpenAI({
        openAIApiKey,
        modelName: 'akjindal53244/Llama-3.1-Storm-8B',
        temperature: 0.7},
        {
          baseURL: openaiBaseUrl,
        },
      ),
    };

    return chatModels;
  } catch (err) {
    logger.error(`Error loading OpenAI models: ${err}`);
    return {};
  }
};

export const loadOpenAIEmbeddingsModels = async () => {
  const openAIApiKey = getOpenaiApiKey();

  if (!openAIApiKey) return {};

  try {
    const embeddingModels = {
      'Text embedding 3 small': new OpenAIEmbeddings({
        openAIApiKey,
        modelName: 'text-embedding-3-small',
      }),
      'Text embedding 3 large': new OpenAIEmbeddings({
        openAIApiKey,
        modelName: 'text-embedding-3-large',
      }),
    };

    return embeddingModels;
  } catch (err) {
    logger.error(`Error loading OpenAI embeddings model: ${err}`);
    return {};
  }
};
