import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_dice", { schema: "game" })
export class GameDice {
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
}
