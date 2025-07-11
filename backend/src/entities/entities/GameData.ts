import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("game_id", ["gameId"], { unique: true })
@Entity("game_data", { schema: "game" })
export class GameData {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "game_id", unique: true })
  gameId: number;

  @Column("int", { name: "bet" })
  bet: number;

  @Column("int", { name: "players_number" })
  playersNumber: number;

  @Column("int", { name: "player_number_set" })
  playerNumberSet: number;
}
