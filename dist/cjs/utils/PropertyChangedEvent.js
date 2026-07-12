"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const TypedEvent_js_1 = require("./TypedEvent.js");
class Component {
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
    propertyChangedEvent = new TypedEvent_js_1.TypedEvent();
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
exports.Component = Component;
//# sourceMappingURL=PropertyChangedEvent.js.map