import mixpanel from "mixpanel-browser";
import { Events, NoopEvents } from "./events"

export const mixPanelEvents: () => Events = () => {
    const mixpanelId = process.env.REACT_APP_MIXPANEL_ID;

    if (mixpanelId !== undefined) {
        mixpanel.init(process.env.REACT_APP_MIXPANEL_ID, { debug: true, ignore_dnt: false });
        mixpanel.track('Open Page');
        return {
            startGame: () => {
                mixpanel.track('Start Game');
            },
            finishGame: (victory) => {
                mixpanel.track('Finish Game', { winner: victory.player });
            }
        }
    }
    console.log("REACT_APP_MIXPANEL_ID is not configured. Disabled User Tracking");
    return NoopEvents;
}