/**
 * numbers: array({start: int, end: int, id: string})
 */
export const combineHighlights = (numbers => {
    return numbers
        .sort((a, b) => a.start - b.start || a.end - b.end)
        .reduce(function(combined, next) {
            if (!combined.length || combined[combined.length - 1].end < next.start) combined.push(next)
            else {
                var prev = combined.pop()
                combined.push({
                    start: prev.start,
                    end: Math.max(prev.end, next.end),
                    id: next.id,
                })
            }
            return combined
        }, [])
})