import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommunitiesController } from './infrastructure/api/communities.controller';
import { CreateCommunityHandler } from './application/commands/create-community.handler';
import { JoinCommunityHandler } from './application/commands/join-community.handler';
import { InMemoryCommunityRepository } from './infrastructure/persistence/in-memory-community.repository';
import { ICommunityRepository } from './domain/community.repository.interface';
import { IdentityModule } from '../identity/identity.module';
import { NotificationsModule } from '../notifications/notifications.module';

const CommandHandlers = [CreateCommunityHandler, JoinCommunityHandler];

@Module({
    imports: [CqrsModule, IdentityModule, NotificationsModule],
    controllers: [CommunitiesController],
    providers: [
        ...CommandHandlers,
        {
            provide: ICommunityRepository,
            useClass: InMemoryCommunityRepository,
        },
    ],
})
export class CommunitiesModule { }
