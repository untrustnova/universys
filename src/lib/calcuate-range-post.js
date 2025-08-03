function calculatePercentageOrPosition(rangeNow, startRate, endRate, startPx = 0, endPx = 100) {
  if(endRate === startRate) {
    return rangeNow >= startRate? endPx:startPx
  }
  const rawPercentage = (rangeNow - startRate) / (endRate - startRate)
  const clampedPercentage = Math.max(0, Math.min(1, rawPercentage))
  if(startPx !== 0 || endPx !== 100) {
    const mappedValue = startPx + (endPx - startPx) * clampedPercentage
    return mappedValue
  }
  return clampedPercentage * 100
}

export default calculatePercentageOrPosition