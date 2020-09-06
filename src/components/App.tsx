import React from 'react'
import { Header } from './Header'
import { Tracker } from '../Pages/Tracker'
import * as DateUtil from '../utils/DateUtil'
import { Store } from '../Store'

const App: React.FC = () => {
  const today = DateUtil.getCurrentDay()
  const store = Store.instance
  const todaysTrackers = store.fetchAllByDay(today)

  return (
    <>
      <Header title="timer" />
      <Tracker todaysTrackers={todaysTrackers} today={today} />
    </>
  )
}

export default App
