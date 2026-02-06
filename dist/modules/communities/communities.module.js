"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const communities_controller_1 = require("./infrastructure/api/communities.controller");
const create_community_handler_1 = require("./application/commands/create-community.handler");
const join_community_handler_1 = require("./application/commands/join-community.handler");
const in_memory_community_repository_1 = require("./infrastructure/persistence/in-memory-community.repository");
const community_repository_interface_1 = require("./domain/community.repository.interface");
const identity_module_1 = require("../identity/identity.module");
const notifications_module_1 = require("../notifications/notifications.module");
const CommandHandlers = [create_community_handler_1.CreateCommunityHandler, join_community_handler_1.JoinCommunityHandler];
let CommunitiesModule = class CommunitiesModule {
};
exports.CommunitiesModule = CommunitiesModule;
exports.CommunitiesModule = CommunitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [cqrs_1.CqrsModule, identity_module_1.IdentityModule, notifications_module_1.NotificationsModule],
        controllers: [communities_controller_1.CommunitiesController],
        providers: [
            ...CommandHandlers,
            {
                provide: community_repository_interface_1.ICommunityRepository,
                useClass: in_memory_community_repository_1.InMemoryCommunityRepository,
            },
        ],
    })
], CommunitiesModule);
//# sourceMappingURL=communities.module.js.map