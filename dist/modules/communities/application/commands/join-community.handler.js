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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinCommunityHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const join_community_command_1 = require("./join-community.command");
const community_repository_interface_1 = require("../../domain/community.repository.interface");
const member_entity_1 = require("../../domain/member.entity");
const common_1 = require("@nestjs/common");
const identity_service_1 = require("../../../identity/identity.service");
const notification_service_1 = require("../../../notifications/notification.service");
let JoinCommunityHandler = class JoinCommunityHandler {
    communityRepository;
    publisher;
    identityService;
    notificationService;
    constructor(communityRepository, publisher, identityService, notificationService) {
        this.communityRepository = communityRepository;
        this.publisher = publisher;
        this.identityService = identityService;
        this.notificationService = notificationService;
    }
    async execute(command) {
        const { communityId, userId, userName, userEmail } = command;
        if (!this.identityService.isValidUser(userId)) {
            throw new common_1.BadRequestException(`User ID ${userId} is invalid (Identity Subdomain check failed)`);
        }
        const community = await this.communityRepository.findById(communityId);
        if (!community) {
            throw new common_1.NotFoundException(`Community with ID ${communityId} not found`);
        }
        const communityAggregate = this.publisher.mergeObjectContext(community);
        const newMember = new member_entity_1.Member(userId, userName, userEmail);
        communityAggregate.addMember(newMember);
        await this.communityRepository.save(communityAggregate);
        this.notificationService.sendEmail(userEmail, 'Welcome!', `You have joined ${community.name}`);
        communityAggregate.commit();
    }
};
exports.JoinCommunityHandler = JoinCommunityHandler;
exports.JoinCommunityHandler = JoinCommunityHandler = __decorate([
    (0, cqrs_1.CommandHandler)(join_community_command_1.JoinCommunityCommand),
    __metadata("design:paramtypes", [community_repository_interface_1.ICommunityRepository,
        cqrs_1.EventPublisher,
        identity_service_1.IdentityService,
        notification_service_1.NotificationService])
], JoinCommunityHandler);
//# sourceMappingURL=join-community.handler.js.map