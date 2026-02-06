"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_community_command_1 = require("../../application/commands/create-community.command");
const join_community_command_1 = require("../../application/commands/join-community.command");
const community_repository_interface_1 = require("../../domain/community.repository.interface");
let CommunitiesController = class CommunitiesController {
    commandBus;
    communityRepository;
    constructor(commandBus, communityRepository) {
        this.commandBus = commandBus;
        this.communityRepository = communityRepository;
    }
    async create(body) {
        const { name, description, isPrivate, creatorId, creatorName, creatorEmail } = body;
        const command = new create_community_command_1.CreateCommunityCommand(name, description, !!isPrivate, creatorId || 'user-1', creatorName || 'Alice', creatorEmail || 'alice@example.com');
        const id = await this.commandBus.execute(command);
        return { id, message: 'Community created successfully' };
    }
    async join(id, body) {
        const { userId, userName, userEmail } = body;
        const command = new join_community_command_1.JoinCommunityCommand(id, userId || 'user-2', userName || 'Bob', userEmail || 'bob@example.com');
        try {
            await this.commandBus.execute(command);
            return { message: 'Joined community successfully' };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        const communities = await this.communityRepository.findAll();
        return communities.map(c => ({
            id: c.id,
            name: c.name,
            membersCount: c.members.length,
            members: c.members
        }));
    }
};
exports.CommunitiesController = CommunitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "join", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunitiesController.prototype, "findAll", null);
exports.CommunitiesController = CommunitiesController = __decorate([
    (0, common_1.Controller)('communities'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        community_repository_interface_1.ICommunityRepository])
], CommunitiesController);
//# sourceMappingURL=communities.controller.js.map