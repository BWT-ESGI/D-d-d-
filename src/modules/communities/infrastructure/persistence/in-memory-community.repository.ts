import { ICommunityRepository } from '../../domain/community.repository.interface';
import { Community } from '../../domain/community.aggregate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryCommunityRepository implements ICommunityRepository {
    private readonly communities: Map<string, Community> = new Map();

    async save(community: Community): Promise<void> {
        this.communities.set(community.id, community);
        // In a real repo, we would map the Aggregate state to DB Entity here
        console.log(`[Persistence] Saved community: ${community.name} (${community.id}) with ${community.members.length} members`);
    }

    async findById(id: string): Promise<Community | null> {
        const community = this.communities.get(id);
        if (!community) return null;

        // In a real repo, we would reconstruct the Aggregate from DB Entity
        // Here we just return the reference (in-memory simulation)
        // To be safer we should clone it, but for demo this is fine.
        return community;
    }

    async findAll(): Promise<Community[]> {
        return Array.from(this.communities.values());
    }
}
