import {
  SimpleChatModel,
  type BaseChatModelParams,
} from '@langchain/core/language_models/chat_models';
import type { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import type { BaseMessage } from '@langchain/core/messages';

interface CustomChatModelInput extends BaseChatModelParams {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
}

export class CustomChatModel extends SimpleChatModel {
  baseUrl?: string;
  apiKey?: string;
  model?: string;

  constructor(fields: CustomChatModelInput) {
    super(fields);
    this.baseUrl = fields.baseUrl;
    this.apiKey = fields.apiKey;
    this.model = fields.model;
  }

  _llmType() {
    return 'custom';
  }

  async _call(
    messages: BaseMessage[],
    options: this['ParsedCallOptions'],
    runManager?: CallbackManagerForLLMRun,
  ): Promise<string> {
    if (!messages.length) {
      throw new Error('No messages provided.');
    }
    // Pass `runManager?.getChild()` when invoking internal runnables to enable tracing
    // await subRunnable.invoke(params, runManager?.getChild());
    if (typeof messages[0].content !== 'string') {
      throw new Error('Multimodal messages are not supported.');
    }
    console.log(
      'messages: ',
      messages.map((msg) => ({
        role: msg.getType() === 'human' ? 'user' : msg.getType(),
        content: msg.content,
      })),
    );
    //请求第三方
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map((msg) => ({
          role: msg.getType() === 'human' ? 'user' : msg.getType(),
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('data: ', JSON.stringify(data, null, 2));
    return data.choices[0].message.content;
  }
}
