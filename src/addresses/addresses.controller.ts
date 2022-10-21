import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import AddressDto from './address.dto';
import AddressesService from './addresses.service';

@Controller('addresses')
export default class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get(':id')
  getById(@Param() { id }: FindOneParams) {
    return this.addressesService.getById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param() { id }: FindOneParams, @Body() addressDto: AddressDto) {
    return this.addressesService.update(id, addressDto);
  }
}
