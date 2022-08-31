import { Exclude } from 'class-transformer';

class UserModel {
  id: number;
  name: number;
  email: string;
  @Exclude({ toPlainOnly: true })
  password: string;
}

export default UserModel;
