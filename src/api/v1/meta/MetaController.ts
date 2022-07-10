import { Controller, Get } from '@nestjs/common';
import { version } from '../../../utils/version';
import { Endpoint } from '../../../utils/Endpoint';
import { StatusResponseDTO } from './dtos/StatusResponseDTO';
import { VersionResponseDTO } from './dtos/VersionResponseDTO';

@Controller()
export class MetaController {
  @Endpoint({ type: StatusResponseDTO })
  @Get('/meta/healthz')
  async getHealth() {
    return StatusResponseDTO.ok();
  }

  @Endpoint({ type: StatusResponseDTO })
  @Get('/meta/simulate-error')
  async simulateError() {
    throw new Error('This is an example of error');
  }

  @Endpoint({ type: VersionResponseDTO })
  @Get('/meta/version')
  async getVersion(): Promise<VersionResponseDTO> {
    return {
      hash: version,
    };
  }
}
