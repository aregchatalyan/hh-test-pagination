import { UsersEntity } from '../entities/users.entity';

export class UsersResponseDto {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  updatedAt: Date;

  constructor(user: UsersEntity) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.phone = user.phone;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
  }
}
