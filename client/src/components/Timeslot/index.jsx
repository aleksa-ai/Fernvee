import React, { useEffect, useState } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";

import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Timeslot (props) {
  let activityCategories = props.activityCategories
  let activities = props.activities
  let [state, setState] = useState([{activity_categories: ['Eat'],
  activities: ['Jules Vernes']}]);

  useEffect(() => {
    setState(activityCategories, activities)
  }, [activityCategories, activities]);

  // const { mode, transition, back } = useVisualMode(
  //   props ? SHOW : EMPTY
  // );

  console.log(state);

  let activityCategory = activityCategories.map((cat, index) => {
    return <p key={index}>{cat.name}</p>
  });

  let activity = activities.map((act, index) => {
    return <p key={index}>{act.name}</p>
  });

  let showFirstActivity = activities.map((act, index) => {
    return (<Show 
      key = {act.id}
      {...act}
    />)
  });

  return ( 
    <div>{activityCategory}
    {showFirstActivity}
    {/* <Show
          //activity = {props.activities[0]}
          // onDelete={() => transition(CONFIRM)}
          // onEdit={() => transition(EDIT)}
        /> */}
        {activity}
        </div>
  )  

  // //if (isLoading)
  // if (!props.activity_category) {
  //   return <h1>Loading....</h1>
  // } else {
  //   return <h1>Show Form</h1>
  // }
  //If props does NOT exist render the EMPTY component
  // IF props does exist use MODE to determine which component to render
  
}

// export default function Timeslot (props) {
//   console.log('PROP INDEX',props)

//   const { mode, transition, back } = useVisualMode(
//     props ? SHOW : EMPTY
//   );

//   const save = (/*name, interviewer*/) => {
//     // const interview = {
//     //   student: name,
//     //   interviewer,
//     // };

//     // //Show SAVING indicator before calling props.bookInterview
//     transition(SAVING, true);

//     // props
//     //   //.bookInterview(props.id, interview)
//     //   .then(() => transition(SHOW))
//     //   .catch(() => transition(ERROR_SAVE, true));
//   };

//   const cancel = () => {
//     transition(DELETING, true);

//     props
//       .cancelInterview(props.id)
//       .then(() => transition(EMPTY))
//       .catch(() => transition(ERROR_DELETE, true));
//   };

//   return (
//     <article className="timeslot">
//       <Header time={"Morning"} />
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SAVING && <Status message={"Saving"} />}
//       {mode === DELETING && <Status message={"Deleting"} />}
//       {mode === CONFIRM && (
//         <Confirm
//           message={"Are you sure you would like to delete?"}
//           onConfirm={cancel}
//           onCancel={() => back()}
//         />
//       )}
//       {mode === SHOW && (
//         <Show
//           activity = {props.activities[0]}
//           onDelete={() => transition(CONFIRM)}
//           onEdit={() => transition(EDIT)}
//         />
//       )}
//       {mode === CREATE && (
//         <Form
//           activityCategories={activityCategories}
//           onSave={save}
//           onCancel={() => back()}
//         />
//       )}
//       {mode === EDIT && (
//         <Form
//           // name={props.interview && props.interview.student}
//           // interviewer={props.interview && props.interview.interviewer.id}
//           // interviewers={props.interviewers}
//           onSave={save}
//           onCancel={() => back()}
//         />
//       )}
//       {mode === ERROR_SAVE && (
//         <Error message={"Could not save activity timeslot."} onClose={() => back()} />
//       )}
//       {mode === ERROR_DELETE && (
//         <Error
//           message={"Could not delete activity timeslot."}
//           onClose={() => back()}
//         />
//       )}
//     </article>
//   );
// }
