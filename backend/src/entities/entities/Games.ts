import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("games", { schema: "game" })
export class Games {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "contractAddress", length: 255 })
  contractAddress: string;

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
}
