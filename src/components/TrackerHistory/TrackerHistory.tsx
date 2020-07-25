import * as React from 'react'
import * as styles from './TrackerHistory.scss'
import { StartButton, PauseButton } from '../Button/PlayButton'
import { Number } from '../Text/Number'
import * as DateUtil from '../../utils/DateUtil'

type ContainerProps = {
  trackers: Tracker[]
  restartCount: (name: string) => void
  pauseCount: (name: string) => void
  inprogress: boolean
  currentCount: number
}

type Props = {
  calcSum: (timers: Timer[]) => number
} & ContainerProps

const Component: React.FC<Props> = ({
  trackers,
  restartCount,
  pauseCount,
  inprogress,
  calcSum,
  currentCount,
}) => (
  <div className={styles.listGroup}>
    {/* TODO: key の値修正 */}
    {trackers.map((tracker) => (
      <div key={tracker.name} className={styles.list}>
        <div className={styles.listTracker}>
          <p>{tracker.name}</p>
          {tracker.inProgress ? (
            <>
              <Number value={calcSum(tracker.timers) + currentCount} type="round" />
              <PauseButton width={36} height={36} onClick={() => pauseCount(tracker.name)} />
            </>
          ) : (
            <>
              <Number value={calcSum(tracker.timers)} type="round" />
              <StartButton
                width={36}
                height={36}
                onClick={() => restartCount(tracker.name)}
                className={inprogress ? 'disable' : ''}
              />
            </>
          )}
        </div>
        <div className={styles.listTimer}>
          <ul>
            {tracker.timers.map((timer) => (
              <li key={timer.start.toString()}>
                <span className={styles.timerStart}>{DateUtil.format(timer.start, 'HH:mm')}</span>
                <span>{timer.end && DateUtil.format(timer.end, 'HH:mm')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
)

export const TrackerHistory: React.FC<ContainerProps> = (props) => {
  const calcSum = (timers: Timer[]) =>
    timers.reduce((accumulator, current) => accumulator + current.minute, 0)

  return <Component {...props} calcSum={calcSum} />
}