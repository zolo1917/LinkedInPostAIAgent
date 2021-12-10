
export class EventModel {
    public eventTitle: string;
    public eventDesc: string;

    constructor(eventTitle: string, eventDesc : string){
        this.eventDesc = eventDesc;
        this.eventTitle = eventTitle;
    }
}