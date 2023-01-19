const showProgressBar = params => {
  const {
    lowerThreshold,
    upperThreshold,
    endValue,
    progressBar,
    metric,
    reverse
  } = params

  let progressStartValue = 0
  const valueContainer = progressBar.querySelector('.value-container')

  // show different colours based on end value
  let graphColor
  let graphBGColor

  if (endValue < lowerThreshold) {
    graphColor = reverse ? '#4ade80' : '#ef4444'
    graphBGColor = reverse ? '#bbf7d0' : '#fca5a5'
  } else if (endValue >= lowerThreshold && endValue <= upperThreshold) {
    graphColor = '#fbee3c'
    graphBGColor = '#fdf5b8'
  } else {
    graphColor = reverse ? '#ef4444' : '#4ade80'
    graphBGColor = reverse ? '#fca5a5' : '#bbf7d0'
  }

  let progress = setInterval(() => {
    let suffix
    let multiplicationFactor

    progressStartValue++

    if (metric === undefined) {
      suffix = '%'
      multiplicationFactor = 3.6
    } else {
      if (metric === 'hours') {
        suffix = 'hrs'
        multiplicationFactor = 15
      } else {
        suffix = ''
        multiplicationFactor = 36
      }
    }

    valueContainer.textContent = `${progressStartValue}${suffix}`

    progressBar.style.background = `conic-gradient(
          ${graphColor} ${progressStartValue * multiplicationFactor}deg,
          ${graphBGColor} ${progressStartValue * multiplicationFactor}deg
      )`

    if (progressStartValue === endValue) {
      clearInterval(progress)
    }
  }, 10)
}

export default showProgressBar
