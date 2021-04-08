import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  users = [];
  constructor(){
      const user = new User({});
      user.id = 1;
      user.name = 'ariel'
      this.users.push({...user})
      user.id = 2;
      user.name = 'dor'
      this.users.push({...user})
      user.id = 3;
      user.name = 'tomer'
      this.users.push({...user})

  }
  async findById(id: number): Promise<User> {
    console.log(this.users.find(p => p.id === id));
    return this.users.find(p => p.id === id);
  }
}
