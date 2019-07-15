import * as event from '../actions/event';
import { FILTER_EVENTS, REMOVE_JOINED_EVENT, SET_ALL_EVENTS } from '../actions/event';
import { EventsState } from '../../models/store/events-state.interface';
import { EventView } from '../../models/events/event-view.interface';
import { TimeOfDay } from '../../models/filter/time-of-day.enum';
import * as moment from 'moment-timezone';
import { environment } from '../../../environments/environment';

const initialState: EventsState = {
    eventList: [],
    filteredEvents: []
};

export function reducer(state = initialState, action: event.Actions): EventsState {
    function filterByText(searchText = '', eventView: EventView): boolean {
        const lowerCaseSearch = searchText.toLowerCase();
        return searchText
            ? eventView.name.toLowerCase().search(lowerCaseSearch) !== -1 ||
                  eventView.city.name.toLowerCase().search(lowerCaseSearch) !== -1
            : true;
    }

    function filterByTimeOfDay(timeOfDay: TimeOfDay, { startDate }: EventView): boolean {
        const formatted = moment(moment(startDate).format(environment.hoursFormat), environment.hoursFormat);
        switch (timeOfDay) {
            case TimeOfDay.MORNING:
                return formatted.isBetween(
                    moment('05:59 am', environment.hoursFormat),
                    moment('12:01 pm', environment.hoursFormat)
                );
            case TimeOfDay.AFTERNOON:
                return formatted.isBetween(
                    moment('11:59 am', environment.hoursFormat),
                    moment('05:01 pm', environment.hoursFormat)
                );
            case TimeOfDay.EVENING:
                return formatted.isBetween(
                    moment('04:59 pm', environment.hoursFormat),
                    moment('09:01 pm', environment.hoursFormat)
                );
            case TimeOfDay.NIGHT:
                return (
                    formatted.isBetween(
                        moment('08:59 pm', environment.hoursFormat),
                        moment('11:59 pm', environment.hoursFormat)
                    ) ||
                    moment(startDate).format(environment.hoursFormat) === '12:00 am' ||
                    formatted.isBetween(
                        moment('12:01 am', environment.hoursFormat),
                        moment('06:01 am', environment.hoursFormat)
                    )
                );
            default:
                return true;
        }
    }

    function cancelEvent(id: number, eventList: Array<EventView>): Array<EventView> {
        return eventList.map((eventView: EventView) => {
            return eventView.id === id ? { ...eventView, joined: false } : eventView;
        });
    }

    switch (action.type) {
        case SET_ALL_EVENTS:
            return {
                eventList: [...action.payload],
                filteredEvents: [...action.payload]
            };
        case FILTER_EVENTS:
            return {
                ...state,
                filteredEvents: [
                    ...state.eventList
                        .filter((eventView: EventView) => filterByText(action.payload.text, eventView))
                        .filter(({ isFree }: EventView) => (action.payload.free ? isFree : true))
                        .filter((eventView: EventView) => filterByTimeOfDay(action.payload.timeOfDay, eventView))
                ]
            };
        case REMOVE_JOINED_EVENT:
            return {
                ...state,
                eventList: [...cancelEvent(action.payload, state.eventList)],
                filteredEvents: [...cancelEvent(action.payload, state.eventList)]
            };
        default:
            return state;
    }
}

export const getEventList = ({ eventList }: EventsState) => eventList;
export const getFilteredEventList = ({ filteredEvents }: EventsState) => filteredEvents;
