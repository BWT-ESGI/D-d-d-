import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateCommunityCommand } from './create-community.command';
import { ICommunityRepository } from '../../domain/community.repository.interface';
import { Community } from '../../domain/community.aggregate';
import { Member } from '../../domain/member.entity';
import * as crypto from 'crypto';

@CommandHandler(CreateCommunityCommand)
export class CreateCommunityHandler implements ICommandHandler<CreateCommunityCommand> {
    constructor(
        private readonly communityRepository: ICommunityRepository,
        private readonly publisher: EventPublisher,
    ) { }

    async execute(command: CreateCommunityCommand): Promise<string> {
        const { name, description, isPrivate, creatorId, creatorName, creatorEmail } = command;

        const creator = new Member(creatorId, creatorName, creatorEmail);
        const communityId = crypto.randomUUID();

        const community = Community.create(
            communityId,
            name,
            description,
            isPrivate,
            creator,
        );

        const communityAggregate = this.publisher.mergeObjectContext(community);

        await this.communityRepository.save(communityAggregate);

        communityAggregate.commit();

        return communityId;
    }
}
