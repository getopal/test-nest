import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    adress: string

    @Column()
    adressee_name: string

    @Column()
    phone: string

    @Column()
    time: string

    @Column()
    comment: string

    @Column({default: false})
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => UserEntity, users => users.orders)
	user: UserEntity[]
}
