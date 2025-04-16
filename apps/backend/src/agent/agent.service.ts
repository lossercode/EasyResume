import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
import { CustomChatModel } from 'src/core/llm';

@Injectable()
export class AgentService {
  async runAgent() {
    const model = new CustomChatModel({
      baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
      apiKey: '',
      model: 'qwen/qwq-32b:free',
    });
    const messages = [{ role: 'user', content: '请把’你好‘翻译成中文' }];

    const result = await model.invoke(messages);
    return result;
  }
}
