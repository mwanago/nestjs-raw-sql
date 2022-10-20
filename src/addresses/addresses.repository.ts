import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import AddressModel from './address.model';
import AddressDto from './address.dto';

@Injectable()
class AddressesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM addresses WHERE id=$1
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new AddressModel(entity);
  }

  async update(id: number, addressData: AddressDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE addresses
      SET street = $2, city = $3, country = $4 
      WHERE id = $1
      RETURNING *
    `,
      [id, addressData.street, addressData.city, addressData.country],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new AddressModel(entity);
  }
}

export default AddressesRepository;
