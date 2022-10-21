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
    const { street, city, country } = addressData;

    const databaseResponse = await this.databaseService.runQuery(
      `
        WITH used_parameters AS (
          SELECT $2, $3, $4
        )
        UPDATE addresses
        SET
        street = ${street !== undefined ? '$2' : 'street'},
        city = ${city !== undefined ? '$3' : 'city'},
        country = ${country !== undefined ? '$4' : 'country'} 
        WHERE id = $1
        RETURNING *
      `,
      [id, street, city, country],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return new AddressModel(entity);
  }
}

export default AddressesRepository;
