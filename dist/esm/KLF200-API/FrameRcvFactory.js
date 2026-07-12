"use strict";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { GatewayCommand } from "./common.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class FrameRcvFactory {
    static async CreateRcvFrame(Buff) {
        const CommandName = GatewayCommand[Buff.readUInt16BE(1)];
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
            let modulePath = resolve(__dirname, `${moduleName}.js`);
            if (!modulePath.startsWith("file://")) {
                modulePath = `file://${modulePath}`;
            }
            this.modules[moduleName] = (await import(modulePath));
        }
    }
}
//# sourceMappingURL=FrameRcvFactory.js.map