import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { azure } from './azure';

import { customMiddleware } from './custom-middleware';

export const customModel = (modelId: string) => {
  // Default to llama-3.3 on Azure
  if (!modelId) {
    return azure(process.env.AZURE_DEPLOYMENT_NAME || 'llama-3.3');
  }

  // Handle different model providers
  if (modelId.startsWith('azure-')) {
    return azure(modelId.replace('azure-', ''));
  }

  return wrapLanguageModel({
    model: openai(modelId),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
