import { ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { JoinCommunityCommand } from './join-community.command';
import { ICommunityRepository } from '../../domain/community.repository.interface';
import { IdentityService } from '../../../identity/identity.service';
import { NotificationService } from '../../../notifications/notification.service';
export declare class JoinCommunityHandler implements ICommandHandler<JoinCommunityCommand> {
    private readonly communityRepository;
    private readonly publisher;
    private readonly identityService;
    private readonly notificationService;
    constructor(communityRepository: ICommunityRepository, publisher: EventPublisher, identityService: IdentityService, notificationService: NotificationService);
    execute(command: JoinCommunityCommand): Promise<void>;
}
