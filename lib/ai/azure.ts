import { createAzure } from '@ai-sdk/azure';
import { generateText } from 'ai';

// Create the base Azure client
export const azure = createAzure({
  apiKey: process.env.AZURE_API_KEY,
  apiVersion: "2024-10-01-preview",
  resourceName: process.env.AZURE_RESOURCE_NAME,
});

// Create a model instance with the deployment name
export const azureModel = azure(process.env.AZURE_DEPLOYMENT_NAME ?? '');

export const defaultAzureConfig = {
  past_messages: 10,
  max_tokens: 800,
  temperature: 0.7,
  top_p: 0.95,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: null
};

export async function generateAzureResponse(messages: any[]) {
  try {
    console.log('Azure Request:', {
      messages,
      deploymentName: process.env.AZURE_DEPLOYMENT_NAME
    });

    const { text } = await generateText({
        model: azureModel,
        messages,
        ...defaultAzureConfig
    });

    console.log('Azure Response:', text);
    return { content: text };

  } catch (err) {
    console.error('Azure API Error:', err);
    throw err;
  }
} 