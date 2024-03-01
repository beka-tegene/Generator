import React, { useState } from 'react'
import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import TableClient from '../client/TableClient'

const Table = () => {
    const [maps, setMaps] = useState();
  const handlerMap = (item) => {
    setMaps(item);
  };
    return (
        <div className='w-full flex items-start justify-start'>
            <Sidebar handlerMap={(item , data) => handlerMap(item )}/>
            <div className='w-[85%] flex items-start justify-start flex-col'>
                <Navbar />
                <TableClient maps={maps}/>
            </div>
        </div>
    )
}

export default Table