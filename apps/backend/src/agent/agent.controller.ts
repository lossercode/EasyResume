import { Controller, Get, Post } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('run')
  runAgent() {
    return this.agentService.runAgent();
  }
}
