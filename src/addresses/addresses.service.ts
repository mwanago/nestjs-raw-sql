import { Injectable } from '@nestjs/common';
import AddressesRepository from './addresses.repository';
import AddressDto from './address.dto';

@Injectable()
class AddressesService {
  constructor(private readonly addressesRepository: AddressesRepository) {}

  getById(id: number) {
    return this.addressesRepository.getById(id);
  }

  update(id: number, addressData: AddressDto) {
    return this.addressesRepository.update(id, addressData);
  }
}

export default AddressesService;
