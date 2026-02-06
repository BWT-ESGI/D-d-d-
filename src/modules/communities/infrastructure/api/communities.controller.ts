import { Controller, Post, Body, Param, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommunityCommand } from '../../application/commands/create-community.command';
import { JoinCommunityCommand } from '../../application/commands/join-community.command';
import { ICommunityRepository } from '../../domain/community.repository.interface';

@Controller('communities')
export class CommunitiesController {
    constructor(
        private readonly commandBus: CommandBus,
        // Injecting repo directly for simple queries to speed up demo
        // In full CQRS, we should use QueryBus + QueryHandlers
        private readonly communityRepository: ICommunityRepository,
    ) { }

    @Post()
    async create(@Body() body: any) {
        const { name, description, isPrivate, creatorId, creatorName, creatorEmail } = body;
        const command = new CreateCommunityCommand(
            name,
            description,
            !!isPrivate,
            creatorId || 'user-1',
            creatorName || 'Alice',
            creatorEmail || 'alice@example.com'
        );

        const id = await this.commandBus.execute(command);
        return { id, message: 'Community created successfully' };
    }

    @Post(':id/join')
    async join(@Param('id') id: string, @Body() body: any) {
        const { userId, userName, userEmail } = body;
        const command = new JoinCommunityCommand(
            id,
            userId || 'user-2',
            userName || 'Bob',
            userEmail || 'bob@example.com'
        );

        try {
            await this.commandBus.execute(command);
            return { message: 'Joined community successfully' };
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        // Direct Repo Access for simplicity (Pragmatic CQRS)
        const communities = await this.communityRepository.findAll();
        return communities.map(c => ({
            id: c.id,
            name: c.name,
            membersCount: c.members.length,
            members: c.members
        }));
    }
}
