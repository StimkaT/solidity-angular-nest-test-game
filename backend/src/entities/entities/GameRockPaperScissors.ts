import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Games } from "./Games";

@Index("fk_game_rps_game", ["gameId"], {})
@Entity("game_rock_paper_scissors", { schema: "game" })
export class GameRockPaperScissors {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id", unsigned: true })
  gameId: number;

  @Column("varchar", { name: "wallet", length: 255 })
  wallet: string;

  @Column("int", { name: "round", default: () => "'1'" })
  round: number;

  @Column("varchar", { name: "result", nullable: true, length: 255 })
  result: string | null;

  @ManyToOne(() => Games, (games) => games.gameRockPaperScissors, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "game_id", referencedColumnName: "id" }])
  game: Games;
}
