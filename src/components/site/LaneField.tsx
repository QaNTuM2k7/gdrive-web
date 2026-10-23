// Rows of drifting lane markings. Pure CSS so it costs no JavaScript; static under reduced motion.

type Lane = { dash: number; gap: number; speed: number; reverse?: boolean; offset?: number }

const defaultLanes: Lane[] = [
  { dash: 140, gap: 70, speed: 16 },
  { dash: 90, gap: 50, speed: 11, reverse: true, offset: -40 },
  { dash: 180, gap: 90, speed: 20, offset: -120 },
  { dash: 60, gap: 40, speed: 9, reverse: true },
  { dash: 120, gap: 60, speed: 14, offset: -70 },
  { dash: 200, gap: 80, speed: 24, reverse: true, offset: -30 },
  { dash: 80, gap: 60, speed: 12, offset: -90 },
  { dash: 150, gap: 70, speed: 18, reverse: true },
]

export function LaneField({
  lanes = defaultLanes,
  laneHeight = 10,
  className = '',
}: {
  lanes?: Lane[]
  laneHeight?: number
  className?: string
}) {
  return (
    <div aria-hidden className={`flex flex-col justify-between overflow-hidden ${className}`}>
      {lanes.map((lane, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className="lane"
            style={
              {
                '--dash': `${lane.dash}px`,
                '--gap': `${lane.gap}px`,
                '--speed': `${lane.speed}s`,
                '--dir': lane.reverse ? 'reverse' : 'normal',
                '--lane-h': `${laneHeight}px`,
                marginLeft: `${lane.offset ?? 0}px`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}
