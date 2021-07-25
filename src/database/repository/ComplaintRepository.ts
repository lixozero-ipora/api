import { EntityRepository, Repository } from 'typeorm'
import Complaint from '../models/Complaint.entity'

@EntityRepository(Complaint)
class ComplaintRepository extends Repository<Complaint> {}

export default ComplaintRepository
