import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column()
  tripType: string;

  @Column()
  vehicleType: string;

  @Column()
  price: number;
}
