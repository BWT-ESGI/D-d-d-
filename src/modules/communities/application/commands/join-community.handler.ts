import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { JoinCommunityCommand } from './join-community.command';
import { ICommunityRepository } from '../../domain/community.repository.interface';
import { Member } from '../../domain/member.entity';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IdentityService } from '../../../identity/identity.service';
import { NotificationService } from '../../../notifications/notification.service';

@CommandHandler(JoinCommunityCommand)
export class JoinCommunityHandler implements ICommandHandler<JoinCommunityCommand> {
    constructor(
        private readonly communityRepository: ICommunityRepository,
        private readonly publisher: EventPublisher,
        private readonly identityService: IdentityService,
        private readonly notificationService: NotificationService,
    ) { }

    async execute(command: JoinCommunityCommand): Promise<void> {
        const { communityId, userId, userName, userEmail } = command;

        // 1. GENERIC SUBDOMAIN CHECK: Identity
        if (!this.identityService.isValidUser(userId)) {
            throw new BadRequestException(`User ID ${userId} is invalid (Identity Subdomain check failed)`);
        }

        // 2. Load Aggregate
        const community = await this.communityRepository.findById(communityId);
        if (!community) {
            throw new NotFoundException(`Community with ID ${communityId} not found`);
        }

        // 3. Merge Context
        const communityAggregate = this.publisher.mergeObjectContext(community);

        // 4. Prepare Value Object
        const newMember = new Member(userId, userName, userEmail);

        // 5. Execute Business Logic (Core Domain)
        communityAggregate.addMember(newMember);

        // 6. Save State
        await this.communityRepository.save(communityAggregate);

        // 7. GENERIC SUBDOMAIN ACTION: Notification
        this.notificationService.sendEmail(userEmail, 'Welcome!', `You have joined ${community.name}`);

        // 8. Commit Events (Triggers SUPPORTING SUBDOMAINS: Analytics & Gamification)
        communityAggregate.commit();
    }
}
