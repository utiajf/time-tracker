import * as React from 'react'
import * as styles from './TrackerForm.scss'
import { TextInput } from '../Input/TextInput'
import { StartButton } from '../Button/PlayButton'
import { keycode } from '../../utils/Constants'

type Props = {
  startCount: () => void
  inprogress: boolean
  isValidName: boolean
} & JSX.IntrinsicElements['input']

type ContainerProps = {
  inprogress: boolean
  startCount: (name: string) => void
} & JSX.IntrinsicElements['input']

const Component: React.FC<Props> = ({ startCount, inprogress, isValidName, ...props }) => (
  <div className={styles.main}>
    <TextInput {...props} disabled={inprogress} />
    <StartButton
      width={42}
      height={42}
      onClick={startCount}
      className={inprogress || isValidName ? 'disable' : ''}
    />
  </div>
)

export const TrackerForm: React.FC<ContainerProps> = (props) => {
  const [trackerName, setTrackerName] = React.useState('')

  // TODO: バリデーション
  const isValidName = React.useMemo(() => !trackerName, [trackerName])

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackerName(event.target.value)
  }

  const startCount = () => {
    if (props.inprogress) {
      return
    }

    if (!trackerName) {
      return
    }

    setTrackerName('')
    props.startCount(trackerName)
  }

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === keycode.enter) {
      startCount()
    }
  }

  return (
    <Component
      {...props}
      startCount={startCount}
      isValidName={isValidName}
      onChange={changeValue}
      onKeyDown={keyDown}
      value={trackerName}
    />
  )
}