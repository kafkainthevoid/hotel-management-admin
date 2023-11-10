'use client'

import { FC, useEffect, useState } from 'react'
import {
  AlbumIcon,
  DollarSignIcon,
  LandmarkIcon,
  Users2Icon,
} from 'lucide-react'

import GrowthCard from './GrowthCard'
import Chart from './Chart'
import TimelineSelect, { Timeline } from './TimelineSelect'
import { differenceInDays } from 'date-fns'

type Booking = { roomCharge: number; createdAt: Date }
type User = { createdAt: Date }

interface DashboardProps {
  bookings: Booking[]
  users: User[]
}

type ChartData = { name: string; prev: number; curr: number }[]

const Dashboard: FC<DashboardProps> = ({ bookings, users }) => {
  const [timeline, setTimeline] = useState<Timeline>('ALL')

  const [income, setIncome] = useState<number>(0)
  const [userNum, setUserNum] = useState<number>(0)
  const [bookingNum, setBookingNum] = useState<number>(0)
  const [chartData, setChartData] = useState<ChartData>([])

  const onTotal = () => {
    const income = bookings.reduce((p, c) => c.roomCharge + p, 0)
    setIncome(income)
    setBookingNum(bookings.length)
    setUserNum(users.length)
  }

  const onSevenDay = () => {
    const filteredUsers = users.filter(
      (user) => differenceInDays(user.createdAt, new Date()) <= 7
    )
    const filteredBookings = bookings.filter(
      (booking) => differenceInDays(booking.createdAt, new Date()) <= 7
    )

    console.log(filteredUsers)
  }

  const onOneMonth = () => {}

  const onOneYear = () => {}

  useEffect(() => {
    switch (timeline) {
      case 'ALL':
        onTotal()
        break
      case '7DAY':
        onSevenDay()
        break
      case 'MONTH':
        onOneMonth()
        break
      case 'YEAR':
        onOneYear()
        break
    }
  }, [timeline])

  return (
    <div className='p-6 h-full max-w-6xl'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <LandmarkIcon className='w-8 h-8 stroke-[1px]' />
          <div className='text-3xl font-bold'>Dashboard</div>
        </div>
        <div>
          <TimelineSelect timeline={timeline} setTimeline={setTimeline} />
        </div>
      </div>

      <main className='gap-6 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9 w-full'>
          <GrowthCard
            type='DECREASE'
            label='Income'
            subLabel='$'
            value={income}
            changeInValue={10}
            icon={DollarSignIcon}
          />
          <GrowthCard
            type='INCREASE'
            label='Customer'
            subLabel='users'
            value={userNum}
            changeInValue={10}
            icon={Users2Icon}
          />
          <GrowthCard
            type='INCREASE'
            label='Booking rooms'
            subLabel='rooms'
            value={bookingNum}
            changeInValue={21}
            icon={AlbumIcon}
          />
        </div>

        <div className='mt-9'>
          <Chart
            label1='Last month'
            dataKey1='uv'
            dataKey2='pv'
            label2='Current month'
          />
        </div>
      </main>
    </div>
  )
}

export default Dashboard