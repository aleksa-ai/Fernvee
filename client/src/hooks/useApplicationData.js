import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    city: 'Paris',
    itinerary: 'Foodie',
    activity_category: 'Eat',
    activity: 'Jules Vernes'
  });
}

  // Load information from database on pageload
useEffect();

  //  On click of the Save button in form
  //  ...

  //  On click of the Confirm button Delete confirmation
  //  ...
