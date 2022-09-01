interface AddressModelData {
  id: number;
  street: string;
  city: string;
  country: string;
}
class AddressModel {
  id: number;
  street: string;
  city: string;
  country: string;
  constructor(data: AddressModelData) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.country = data.country;
  }
}

export default AddressModel;
