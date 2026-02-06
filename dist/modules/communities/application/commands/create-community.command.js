"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommunityCommand = void 0;
class CreateCommunityCommand {
    name;
    description;
    isPrivate;
    creatorId;
    creatorName;
    creatorEmail;
    constructor(name, description, isPrivate, creatorId, creatorName, creatorEmail) {
        this.name = name;
        this.description = description;
        this.isPrivate = isPrivate;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.creatorEmail = creatorEmail;
    }
}
exports.CreateCommunityCommand = CreateCommunityCommand;
//# sourceMappingURL=create-community.command.js.map