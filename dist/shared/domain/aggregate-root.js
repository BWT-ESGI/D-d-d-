"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class AggregateRoot extends cqrs_1.AggregateRoot {
    id;
    constructor(id) {
        super();
        this.id = id;
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.js.map