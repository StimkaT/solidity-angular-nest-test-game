import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_rock_paper_scissors", { schema: "game" })
export class GameRockPaperScissors {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id" })
  gameId: number;

  @Column("varchar", { name: "wallets", length: 255 })
  wallets: string;

  @Column("int", { name: "round", default: () => "'1'" })
  round: number;

  @Column("varchar", { name: "result", nullable: true, length: 255 })
  result: string | null;
}
