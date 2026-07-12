"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameRcvFactory = void 0;
const path_1 = require("path");
const common_js_1 = require("./common.js");
class FrameRcvFactory {
    static async CreateRcvFrame(Buff) {
        const CommandName = common_js_1.GatewayCommand[Buff.readUInt16BE(1)];
        await this.LoadModule(CommandName);
        const typeToCreate = this.modules[CommandName][CommandName];
        if (typeToCreate === undefined)
            throw new Error(`Unknown command ${CommandName}.`);
        return new typeToCreate(Buff);
    }
    static modules = {};
    /**
     * Load a module dynamically.
     * @param moduleName The name of the module to load.
     * @returns A promise that resolves when the module is loaded.
     * @throws {Error} If the module cannot be found.
     */
    static async LoadModule(moduleName) {
        if (!this.modules[moduleName]) {
            const modulePath = (0, path_1.resolve)(__dirname, moduleName);
            this.modules[moduleName] = (await Promise.resolve(`${modulePath}`).then(s => require(s)));
        }
    }
}
exports.FrameRcvFactory = FrameRcvFactory;
//# sourceMappingURL=FrameRcvFactory.js.map