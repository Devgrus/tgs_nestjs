import { EntityRepository, Repository } from 'typeorm';
import { Offre } from '../entities/offre.entity';

@EntityRepository(Offre)
export class OffreRepository extends Repository<Offre> {}
