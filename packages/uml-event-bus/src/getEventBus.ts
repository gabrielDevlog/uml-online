import Eev from "eev";
import { EventEnum } from "./EventEnum";

/**
 * An event bus
 * Optionnal
 * If not null, getEventBus() will return this one instead of global window.umlEventBus
 */
let packageScopedEventBus: Eev | null = null;

/**
 * Return a singleton which is common a bus event for this package
 *
 * packageScoped: return packageScopedEventBus if present, so event are scoped
 * default: return window.umlEventBus so all services in same window have access
 */
function getEventBus(): Eev {
  if (packageScopedEventBus) {
    return packageScopedEventBus;
  }

  if (!(window as any).umlEventBus) {
    (window as any).umlEventBus = createEventBus();
  }

  return (window as any).umlEventBus;
}

/**
 * Emit an event on shared bus
 */
export function emitEvent(event: EventEnum) {
  const bus = getEventBus();
  bus.emit(event);
}

/**
 * React to an event emitted on shared bus
 */
export function handleEvent(event: EventEnum, fn: (data: any) => void) {
  const bus = getEventBus();
  return bus.on(event, fn);
}

/**
 * set an eventBus as package eventBus
 */
export function setEventBus(eventBus: Eev): void {
  if (packageScopedEventBus) {
    console.warn("Uml-event-bus: scoped bus already defined");
  }
  packageScopedEventBus = eventBus;
}

/**
 * Create an event bus
 */
export function createEventBus(): Eev {
  return new Eev();
}
