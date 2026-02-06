import { ICommunityRepository } from '../../domain/community.repository.interface';
import { Community } from '../../domain/community.aggregate';
export declare class InMemoryCommunityRepository implements ICommunityRepository {
    private readonly communities;
    save(community: Community): Promise<void>;
    findById(id: string): Promise<Community | null>;
    findAll(): Promise<Community[]>;
}
