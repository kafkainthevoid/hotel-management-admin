'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Page b',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

import { FC } from 'react'

interface MainChartProps {
  label1: string
  label2: string
  dataKey1: string
  dataKey2: string
}

const Chart: FC<MainChartProps> = ({ label1, label2, dataKey1, dataKey2 }) => {
  return (
    <div className='rounded-md bg-slate-100 p-3'>
      <div className='font-semibold text-xl text-center tracking-wide text-slate-700'>
        Net Profit
      </div>
      <div className='h-[550px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            title='Profit Net'
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              name={label2}
              dataKey={dataKey2}
              stroke='#0d9488'
              activeDot={{ r: 8 }}
            />
            <Line
              className=''
              type='monotone'
              name={label1}
              dataKey={dataKey1}
              textAnchor='curre'
              stroke='#ef4444'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart