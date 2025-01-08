import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("livros")
export default class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date" })
  publication_date: Date;

  @Column({ type: "varchar", length: 13 })
  isbn: string;

  @Column({ type: "int" })
  page_count: number;

  @Column({ type: "varchar", length: 100 })
  language: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
