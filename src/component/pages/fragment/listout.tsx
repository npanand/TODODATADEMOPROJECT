
import React from 'react'
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deletes } from "../../../slices/dataslice";
interface ListoutPropsData{
    todolist:any,
    modeChange:any,
    updateData:any,
}
const Listout: React.FC<ListoutPropsData> = ({todolist, updateData, modeChange }) => {

    const dispatch = useDispatch();

    const deletetodo = (arg: string) => {
        dispatch(deletes(arg));
        toast.success('Success Fully Data Deleted!', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <div >
            {
                todolist?.map((data: any, id: any) => {
                    return (
                        <div key={id} className='m-3 border-solid border-red-700  border-2 p-1'><ul key={id} className="flex justify-between list-none"  >
                            <li >{data}</li>
                            <span className='flex justify-end'>
                                <button className='mr-2 cursor-pointer' onClick={() => (
                                    updateData({ data, id }), modeChange("update"))
                                }><BsPencilSquare /></button>
                                <button className='mr-2 cursor-pointer' onClick={() =>
                                    deletetodo(data)
                                }><MdDelete /></button>
                            </span>
                        </ul>
                        </div>)
                })}
        </div>
    )
}

export default Listout;