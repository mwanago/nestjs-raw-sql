interface AddressModelData {
  id: number;
  street: string | null;
  city: string | null;
  country: string | null;
}
class AddressModel {
  id: number;
  street: string | null;
  city: string | null;
  country: string | null;
  constructor(data: AddressModelData) {
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.country = data.country;
  }
}

export default AddressModel;
