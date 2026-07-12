/**
 * Generic typed interface for defining a typed listener function.
 *
 * @interface Listener<T>
 */
export interface Listener<T> {
    /**
     * This function is called in case of an event.
     * @param {T} event The typed event parameter.
     * @returns {any} The returned value of the function will be ignored.
     */
    (event: T): any;
}
/** passes through events as they happen. You will not get events from before you start listening */
/**
 * Event emitter class that handles typed events.
 *
 * @class TypedEvent<T>
 */
export declare class TypedEvent<T> implements Disposable {
    private listeners;
    private listenersOncer;
    [Symbol.dispose](): void;
    /**
     * Adds a listener function to an event emitter.
     *
     * @param listener Function that is called if the event is emitted.
     * @returns {Disposable} Returns a disposable object that should be disposed when not needed anymore.
     */
    on(listener: Listener<T>): Disposable;
    /**
     * Adds a listener function to an event emitter that is called only once.
     *
     * @param listener Function that is called only once if the event is emitted.
     * @returns {void}
     */
    once(listener: Listener<T>): void;
    /**
     * Removes a listener function from an event emitter.
     * If it is called from inside an event handler
     * the current event will still call the removed handler
     * if it wasn't called so far.
     *
     * @param listener Function that should be removed.
     * @returns {void}
     */
    off(listener: Listener<T>): void;
    /**
     * Calls the registered event handler listener functions on after the other.
     * The order in which the functions are called is not defined.
     *
     * @param {T} event The typed event parameter that will be provided to each listener.
     * @returns {Promise<void>}
     */
    emit(event: T): Promise<void>;
    /**
     * Pipes another event emitter to this event emitter.
     *
     * @param te Event emitter that is called after this event emitter.
     * @returns {Disposable} Returns a disposable object that should be disposed when not needed anymore.
     */
    pipe(te: TypedEvent<T>): Disposable;
    /**
     * Removes all listeners from an event emitter.
     *
     * @returns {void}
     */
    removeAllListeners(): void;
}
