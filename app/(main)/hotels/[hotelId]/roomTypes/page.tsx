import { format } from 'date-fns'

import { db } from '@/lib/db'
import { Column, columns } from './components/columns'
import { DataTable } from '@/components/ui/data-table'
import { infoData } from './data'

const RoomTypesPage = async () => {
  const roomTypes = await db.roomType.findMany({
    orderBy: { createdAt: 'desc' },
    include: { amenity_RoomTypes: { include: { amenity: true } } },
  })

  const formattedData: Column[] = roomTypes.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    images: item.images,
    occupancy: item.occupancy,
    price: item.price,
    maxBookingDay: item.maxBookingDay,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
    amenities: item.amenity_RoomTypes.map((ar) => ar.amenity.name),
  }))

  return (
    <div className='p-10'>
      <h1 className='tracking-tight text-3xl font-semibold'>
        {infoData.label} ({formattedData.length})
      </h1>
      <p>Manage {infoData.label}</p>

      <hr className='my-6' />

      <DataTable data={formattedData} columns={columns} searchKey='name' />
    </div>
  )
}

export default RoomTypesPage
