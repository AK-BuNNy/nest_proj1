import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { encodedPassword } from './../../bcrypt';
import { UtilsService } from './../../utils/utils.service';

@Entity({ name: 'users' })
export class User {
  constructor(private readonly utilsService: UtilsService) {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string; // If 'Name' is also a database column

  @Column()
  phone: number;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await encodedPassword(this.password);// cannot add to utils.service now on bcrypt.ts
    }
  }
}