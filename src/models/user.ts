import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export const userRoles = ['user', 'owner', 'admin'] as const;
export type UserRole = typeof userRoles[number];

export const userStates = ['PENDING_VERIFICATION', 'VERIFIED'] as const;
export type UserState = typeof userStates[number];

export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	_id: string

	@Column()
	email: string

	@Column({ enum: userRoles, default: userRoles[0] })
	role: UserRole

	@Column({ enum: userStates, default: userStates[0] })
	state: UserState

	@Column()
	hashedPassword: string

	@CreateDateColumn()
	created_at: string

	@UpdateDateColumn()
	updated_at: string
}

type Fields = keyof Omit<User, 'hashedPassword'>
export const safeFields: Fields[] = ['_id', 'email', 'role', 'state', 'created_at', 'updated_at'];
