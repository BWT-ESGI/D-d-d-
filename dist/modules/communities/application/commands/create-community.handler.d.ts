import { ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCommunityCommand } from './create-community.command';
import { ICommunityRepository } from '../../domain/community.repository.interface';
export declare class CreateCommunityHandler implements ICommandHandler<CreateCommunityCommand> {
    private readonly communityRepository;
    private readonly publisher;
    constructor(communityRepository: ICommunityRepository, publisher: EventPublisher);
    execute(command: CreateCommunityCommand): Promise<string>;
}
