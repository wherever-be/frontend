export function getSteps(state) {
  const steps = [
    {
      name: 'chooseTimeFrame',
      nextStepDisabled: !state.application.timeFrame,
    },
    {
      name: 'chooseDurationRange',
    },
    {
      name: 'chooseOriginCities',
      nextStepDisabled: state.application.friends.length === 0,
    },
    {
      name: 'chooseDestination',
      nextStepDisabled: !state.application.destination?.country,
    },
  ];

  if (state.application.search?.results) {
    if ([...new Set(state.application.search?.results?.map(r => r.destination))].length > 1) {
      steps.push({
        name: 'resultsCities',
      });
    }

    steps.push({
      name: 'resultsFinal',
    });
  }

  return steps;
}
