import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
} from 'typeorm';
import { Min } from 'class-validator';
import { Customer } from './Customer';
import { Transaction } from './Transaction';

export enum accountTypes {
	SAVINGS = 'savings',
	CURRENT = 'current',
	FD = 'fixed deposit',
	RECURRING = 'recurring',
}

@Entity()
export class Account {
	@PrimaryGeneratedColumn('uuid')
	accountNumber!: string;

	@Column({
		type: 'enum',
		enum: accountTypes,
		default: accountTypes.SAVINGS,
	})
	role!: accountTypes;

	@Column('double precision', { default: 0 })
	@Min(0)
	balance!: number;

	@ManyToOne(() => Customer, customer => customer.accounts)
	customer!: Customer;

	@CreateDateColumn()
	accountCreated!: string;

	@OneToMany(() => Transaction, account => account.transactionId)
	transactions!: Transaction[];

	constructor(customer: Customer, balance?: number) {
		this.customer = customer;
		this.balance = balance || 0;
	}
}
