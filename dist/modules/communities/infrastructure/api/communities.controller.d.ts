import { CommandBus } from '@nestjs/cqrs';
import { ICommunityRepository } from '../../domain/community.repository.interface';
export declare class CommunitiesController {
    private readonly commandBus;
    private readonly communityRepository;
    constructor(commandBus: CommandBus, communityRepository: ICommunityRepository);
    create(body: any): Promise<{
        id: any;
        message: string;
    }>;
    join(id: string, body: any): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        membersCount: number;
        members: import("../../domain/member.entity").Member[];
    }[]>;
}
