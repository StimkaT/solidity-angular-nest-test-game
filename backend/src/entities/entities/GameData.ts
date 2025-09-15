import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Games } from "./Games";

@Index("game_id", ["gameId"], { unique: true })
@Index("idx_game_data_game_id", ["gameId"], {})
@Index("uk_game_data_game", ["gameId"], { unique: true })
@Entity("game_data", { schema: "game" })
export class GameData {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id", unique: true, unsigned: true })
  gameId: number;

  @Column("int", { name: "bet" })
  bet: number;

  @Column("int", { name: "players_number" })
  playersNumber: number;

  @Column("int", { name: "player_number_set" })
  playerNumberSet: number;

  @Column("int", { name: "bots", default: () => "'0'" })
  bots: number;

  @OneToOne(() => Games, (games) => games.gameData, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "id" }])
  game: Games;
}
