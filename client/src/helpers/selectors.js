export function getActivity(state, activity) {
  if (!activity) return null;
  return {
    name: activity.name,
    //interviewer: state.interviewers[interview.interviewer],
  };
}