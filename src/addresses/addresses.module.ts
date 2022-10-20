import { Module } from '@nestjs/common';
import AddressesController from './addresses.controller';
import AddressesService from './addresses.service';
import AddressesRepository from './addresses.repository';

@Module({
  imports: [],
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository],
})
class AddressesModule {}

export default AddressesModule;
