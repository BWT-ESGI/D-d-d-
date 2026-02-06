import { Community } from './community.aggregate';
export declare abstract class ICommunityRepository {
    abstract save(community: Community): Promise<void>;
    abstract findById(id: string): Promise<Community | null>;
    abstract findAll(): Promise<Community[]>;
}
