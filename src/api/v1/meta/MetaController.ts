import { Controller, Get } from '@nestjs/common';
import { version } from '../../../utils/version';
import { DocumentationTags, Endpoint } from '../../../utils/Endpoint';
import { StatusResponseDTO } from './dtos/StatusResponseDTO';
import { VersionResponseDTO } from './dtos/VersionResponseDTO';

@Controller()
export class MetaController {
  @Endpoint({ type: StatusResponseDTO, tags: [DocumentationTags.META] })
  @Get('/meta/healthz')
  async getHealth() {
    return StatusResponseDTO.ok();
  }

  @Endpoint({ type: StatusResponseDTO, tags: [DocumentationTags.META] })
  @Get('/meta/simulate-error')
  async simulateError() {
    throw new Error('This is an example of error');
  }

  @Endpoint({ type: VersionResponseDTO, tags: [DocumentationTags.META] })
  @Get('/meta/version')
  async getVersion(): Promise<VersionResponseDTO> {
    return {
      hash: version,
    };
  }
}
