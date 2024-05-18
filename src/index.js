import * as route from "./utils/route.js";
import * as event from "./utils/event.js";

route.start();
event.listenClickEvent();
event.listenPopStateEvent();
event.listenRangeEvent();
