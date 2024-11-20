import EventCalendar from "./EventCalendar";
import { addDays, subDays } from "date-fns";

const App = () => {
  return (
    <div className="">
      <EventCalendar
        events={[
          { date: subDays(new Date(), 6), title: "Meeting with basile" },
          { date: subDays(new Date(), 1), title: "Apply for Job" },
          { date: addDays(new Date(), 3), title: "GYM forget about becode" },
        ]}
      />
    </div>
  );
};

export default App;
