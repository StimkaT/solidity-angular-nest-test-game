import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GameData } from "./GameData";
import { GamePlayers } from "./GamePlayers";
import { GameRockPaperScissors } from "./GameRockPaperScissors";
import { GameTypes } from "./GameTypes";

@Index("idx_games_type_name", ["type"], {})
@Entity("games", { schema: "game" })
export class Games {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "type", nullable: true, length: 256 })
  type: string | null;

  @Column("varchar", { name: "contractAddress", nullable: true, length: 255 })
  contractAddress: string | null;

  @Column("varchar", { name: "ownerAddress", length: 255 })
  ownerAddress: string;

  @Column("timestamp", { name: "finished_at", nullable: true })
  finishedAt: Date | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToOne(() => GameData, (gameData) => gameData.game)
  gameData: GameData;

  @OneToMany(() => GamePlayers, (gamePlayers) => gamePlayers.game)
  gamePlayers: GamePlayers[];

  @OneToMany(
    () => GameRockPaperScissors,
    (gameRockPaperScissors) => gameRockPaperScissors.game
  )
  gameRockPaperScissors: GameRockPaperScissors[];

  @ManyToOne(() => GameTypes, (gameTypes) => gameTypes.games, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "type", referencedColumnName: "name" }])
  type2: GameTypes;
}
