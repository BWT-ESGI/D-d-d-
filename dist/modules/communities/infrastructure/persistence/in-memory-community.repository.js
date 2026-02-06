"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCommunityRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryCommunityRepository = class InMemoryCommunityRepository {
    communities = new Map();
    async save(community) {
        this.communities.set(community.id, community);
        console.log(`[Persistence] Saved community: ${community.name} (${community.id}) with ${community.members.length} members`);
    }
    async findById(id) {
        const community = this.communities.get(id);
        if (!community)
            return null;
        return community;
    }
    async findAll() {
        return Array.from(this.communities.values());
    }
};
exports.InMemoryCommunityRepository = InMemoryCommunityRepository;
exports.InMemoryCommunityRepository = InMemoryCommunityRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryCommunityRepository);
//# sourceMappingURL=in-memory-community.repository.js.map