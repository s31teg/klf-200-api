"use strict";
import { TypedEvent } from "./TypedEvent.js";
export class Component {
    [Symbol.dispose]() {
        // Clean up resources or perform any necessary teardown logic
        this.propertyChangedEvent[Symbol.dispose]();
    }
    /**
     * The event will be emitted when any of the public properties has changed.
     * The event object contains a reference to the product, the name of the property
     * that has changed and the new value of that property.
     *
     */
    propertyChangedEvent = new TypedEvent();
    /**
     * This method emits the property changed event for the provided property name.
     *
     * @protected
     * @param {keyof Component} propertyName Name of the property that has changed.
     */
    async propertyChanged(propertyName) {
        await this.propertyChangedEvent.emit({
            o: this,
            propertyName: propertyName,
            propertyValue: this[propertyName],
        });
    }
}
//# sourceMappingURL=PropertyChangedEvent.js.map