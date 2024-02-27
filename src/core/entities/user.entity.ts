import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../../shared/constants';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 80,
  })
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
}

export default User;
