import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Games } from "./Games";

@Index("name", ["name"], { unique: true })
@Entity("game_types", { schema: "game" })
export class GameTypes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 256 })
  name: string;

  @OneToMany(() => Games, (games) => games.type2)
  games: Games[];
}
