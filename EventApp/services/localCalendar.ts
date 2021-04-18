import RNCalendarEvents from 'react-native-calendar-events'; 
class LocalCalendarService {
    async listEvents(){
        let permissions;
        let events = [];
        try {
            permissions = await RNCalendarEvents.checkPermissions();
            if (permissions !== 'authorized') {
              permissions = await RNCalendarEvents.requestPermissions();
            }
        
            if (permissions !== 'authorized') {
              throw 'Access calendar not authorized';
            }
        
            events = await RNCalendarEvents.findCalendars();
          } catch {}
        
          return events;
    }

     async addCalendarEvent(event){
         console.log(event)
        let permissions;
        let createdEvent = false;
        try {
          permissions = await RNCalendarEvents.checkPermissions();
          console.log(permissions)
          if (permissions !== 'authorized') {
            permissions = await RNCalendarEvents.requestPermissions();
          }
      
          if (permissions !== 'authorized') {
            throw 'Access calendar not authorized';
          }
      
          const eventTmp = {...event};
        //  eventTmp.calendarId = calendar.id;
          createdEvent = (await RNCalendarEvents.saveEvent(event.text, eventTmp)) != null? true: false;
        } catch {}
      
        return createdEvent;
      };


}
export default LocalCalendarService;