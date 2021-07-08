import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';
import { Offre } from './offre.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromAddress: string;

  @Column()
  toAddress: string;

  @Column()
  userId: string;

  @Column()
  startDate: string;

  @OneToOne(() => Offre)
  @JoinColumn()
  offre: Offre;

  @OneToOne(() => Note)
  @JoinColumn()
  note: Note;
}
