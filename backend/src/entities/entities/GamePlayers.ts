import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Games } from "./Games";

@Index("game_id", ["gameId"], {})
@Index("idx_game_players_game_id", ["gameId"], {})
@Index("idx_game_players_wallet", ["wallet"], {})
@Entity("game_players", { schema: "game" })
export class GamePlayers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id", unsigned: true })
  gameId: number;

  @Column("varchar", { name: "wallet", length: 50 })
  wallet: string;

  @Column("int", { name: "user_id" })
  userId: number;

  @ManyToOne(() => Games, (games) => games.gamePlayers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "id" }])
  game: Games;
}
