import { Exclude } from 'class-transformer';
import AddressModel from './address.model';

type UserModelData = {
  id: number;
  name: number;
  email: string;
  password: string;
  address_id?: number;
  address_street?: string;
  address_city?: string;
  address_country?: string;
};
class UserModel {
  id: number;
  name: number;
  email: string;
  @Exclude()
  password: string;
  address?: AddressModel;

  constructor(data: UserModelData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    if (data.address_id) {
      this.address = new AddressModel({
        id: data.address_id,
        street: data.address_street,
        city: data.address_city,
        country: data.address_country,
      });
    }
  }
}

export default UserModel;
