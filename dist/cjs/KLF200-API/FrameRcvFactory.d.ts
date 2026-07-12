import { IGW_FRAME_RCV } from "./common.js";
export declare class FrameRcvFactory {
    static CreateRcvFrame(Buff: Buffer): Promise<IGW_FRAME_RCV>;
    private static modules;
    /**
     * Load a module dynamically.
     * @param moduleName The name of the module to load.
     * @returns A promise that resolves when the module is loaded.
     * @throws {Error} If the module cannot be found.
     */
    private static LoadModule;
}
