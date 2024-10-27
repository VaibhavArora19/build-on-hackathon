import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/:address')
  async getPositions(@Param('address') address: string) {
    const data = await this.positionsService.getPositions(address);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
