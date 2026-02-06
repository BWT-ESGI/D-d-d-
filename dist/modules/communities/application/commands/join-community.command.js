"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinCommunityCommand = void 0;
class JoinCommunityCommand {
    communityId;
    userId;
    userName;
    userEmail;
    constructor(communityId, userId, userName, userEmail) {
        this.communityId = communityId;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}
exports.JoinCommunityCommand = JoinCommunityCommand;
//# sourceMappingURL=join-community.command.js.map