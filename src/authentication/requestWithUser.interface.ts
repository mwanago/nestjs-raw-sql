import { Request } from 'express';
import UserModel from '../users/user.model';

interface RequestWithUser extends Request {
  user: UserModel;
}

export default RequestWithUser;
