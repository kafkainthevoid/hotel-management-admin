import { format } from 'date-fns'

import { Column, columns } from './components/columns'
import { db } from '@/lib/db'
import { DataTable } from '@/components/ui/data-table'

const AmenitiesPage = async () => {
  const amenities = await db.amenity.findMany({
    orderBy: { name: 'asc' },
  })

  const formattedData: Column[] = amenities.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(item.createdAt, 'MMM do, yyyy'),
  }))

  return (
    <div className='p-10'>
      <h1 className='tracking-tight text-3xl font-semibold'>
        Amenity ({formattedData.length})
      </h1>
      <p>Manage Amenity</p>
      <hr className='my-6' />
      <DataTable searchKey='name' columns={columns} data={formattedData} />
    </div>
  )
}

export default AmenitiesPage
