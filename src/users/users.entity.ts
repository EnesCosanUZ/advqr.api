import { QR } from '../qrs/qrs.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

export enum UserType {
    Default = 'default',
    Moderator = 'moderator',
    Admin = 'admin',
  }

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: UserType, default: UserType.Default })
    userType: UserType;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    name: string;
    
    @Column()
    surname: string;

    @OneToMany(() => QR, qr => qr.user)
    qrs: QR[];
}
