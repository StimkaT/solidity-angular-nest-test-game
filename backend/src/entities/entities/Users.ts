import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GamePlayers } from "./GamePlayers";

@Index("IDX_2d443082eccd5198f95f2a36e2", ["login"], { unique: true })
@Entity("users", { schema: "game" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "login", unique: true, length: 100 })
  login: string;

  @Column("varchar", { name: "status", length: 255, default: () => "'player'" })
  status: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "wallet", nullable: true, length: 255 })
  wallet: string | null;

  @Column("text", { name: "encrypted_private_key", nullable: true })
  encryptedPrivateKey: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @OneToMany(() => GamePlayers, (gamePlayers) => gamePlayers.user)
  gamePlayers: GamePlayers[];
}
