import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column()
  nationality: string;
}
