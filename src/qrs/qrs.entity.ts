import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class QR {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qrReal: string;

    @Column('text')
    qrPath: string;
    
    @Column()
    qrOpened: number;

    @Column('datetime')
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.id)
    user: User;
}
