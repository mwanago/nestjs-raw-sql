import { Exclude } from 'class-transformer';
import AddressModel from './address.model';

type UserModelData = {
  id: number;
  name: string;
  email: string;
  password: string;
  address_id: number | null;
  address_street: string | null;
  address_city: string | null;
  address_country: string | null;
};
class UserModel {
  id: number;
  name: string;
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
