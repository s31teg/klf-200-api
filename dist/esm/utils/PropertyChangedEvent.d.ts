import { TypedEvent } from "./TypedEvent.js";
export type PropertyChangedEvent = {
    o: object;
    propertyName: string;
    propertyValue: any;
};
export declare abstract class Component implements Disposable {
    [Symbol.dispose](): void;
    /**
     * The event will be emitted when any of the public properties has changed.
     * The event object contains a reference to the product, the name of the property
     * that has changed and the new value of that property.
     *
     */
    readonly propertyChangedEvent: TypedEvent<PropertyChangedEvent>;
    /**
     * This method emits the property changed event for the provided property name.
     *
     * @protected
     * @param {keyof Component} propertyName Name of the property that has changed.
     */
    protected propertyChanged(propertyName: keyof this): Promise<void>;
}
