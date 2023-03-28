import { IPrinting } from "@type/printing";

interface EventsMap {
  [event: string]: any;
}
type EventParams<
  Map extends EventsMap,
  Ev extends EventNames<Map>
> = Parameters<Map[Ev]>;
type ReservedOrUserEventNames<
  ReservedEventsMap extends EventsMap
> = EventNames<ReservedEventsMap>;
type ReservedOrUserListener<
  ReservedEvents extends EventsMap,
  Ev extends ReservedOrUserEventNames<ReservedEvents>
> = FallbackToUntypedListener<
  Ev extends EventNames<ReservedEvents>
  ? ReservedEvents[Ev]
  : never
>;
type FallbackToUntypedListener<T> = [T] extends [never]
    ? (...args: any[]) => void | Promise<void>
    : T;

export type EventNames<Map extends EventsMap> = keyof Map & (string | symbol);

class Pipe<ListenEvents extends EventsMap> {
  private eventMap = new Map<EventNames<ListenEvents>, ReservedOrUserListener<ListenEvents, EventNames<ListenEvents>>>();
  constructor() {}
  on<Ev extends ReservedOrUserEventNames<ListenEvents>>(ev: Ev, fn: ReservedOrUserListener<ListenEvents, Ev>) {
    this.eventMap.set(ev, fn);
  }
  emit<Ev extends EventNames<ListenEvents>>(ev: Ev, ...args: EventParams<ListenEvents, Ev>) {
    this.eventMap.get(ev)?.(...args);
  }
}
const pipe = new Pipe<{
  'printing': (id: Id) => void;
  'draw': (data: IPrinting) => void;
}>();
export default pipe;