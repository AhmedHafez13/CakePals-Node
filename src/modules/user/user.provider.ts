import UserModel, { UserDocument } from './user.model';

class UserProvider {
  public async findUserById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id);
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  public async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<UserDocument> {
    const user = new UserModel({ username, email, password });
    return user.save();
  }
}

export default new UserProvider();
