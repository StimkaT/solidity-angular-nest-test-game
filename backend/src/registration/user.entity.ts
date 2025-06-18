import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, unique: true })
  login: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, nullable: true })
  wallet?: string;

  @Column({ type: 'text', nullable: true })
  encrypted_private_key?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
