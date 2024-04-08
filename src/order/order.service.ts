import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
		@InjectRepository(OrderEntity)
		private repository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

  create(createOrderDto: CreateOrderDto) {
    return this.repository.save(createOrderDto)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: string) {
    return this.repository.findOne({where: {id}})
  }

 async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.repository.findOne({where: {id}})

    Object.assign(order, updateOrderDto)

    return await this.repository.save(order)
  }

 async remove(id: string) {
    const order = await this.repository.findOne({where: {id}})

    if (!order) {
			throw new Error('Order not found')
		}

    return this.repository.delete(id)
  }

  async changeStatus(id: string, userEmail: string) {
    const order = await this.repository.findOne({where: {id}})
    const user = await this.userRepository.findOne({ where: { email: userEmail } })


    order.active = true


    if (!order) {
			throw new Error('Order not found')
		}

    await this.userRepository
          .createQueryBuilder()
          .relation(UserEntity, 'orders')
          .of(user)
          .add(order)

    return await this.repository.save(order)

  }
}
