import { OrderEntity } from 'src/order/entities/order.entity'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne
} from 'typeorm'

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	nick: string

	@Column()
	ava: string

	@Column({ default: false })
	isAdmin: boolean

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@OneToOne(() => OrderEntity, order => order.user, { eager: true })
	orders: OrderEntity[]
}