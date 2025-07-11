import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("game_id", ["gameId"], {})
@Entity("game_players", { schema: "game" })
export class GamePlayers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id" })
  gameId: number;

  @Column("varchar", { name: "wallet", length: 50 })
  wallet: string;

  @Column("int", { name: "user_id" })
  userId: number;
}
