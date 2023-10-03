import { Field, Form, Formik } from 'formik';
import { useState } from 'react'
import * as Yup from 'yup';
import Listout from './fragment/listout';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { add, update } from '../../slices/dataslice';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

const todoschema = Yup.object().shape({
  tododata: Yup.string().required("required"),
})

const todoupdateschema = Yup.object().shape({
  modified: Yup.string().required("required"),
})

interface updateTodotyp {
  data: string,
  id: number,
}
interface addDataSchema {
  tododata?: string,
  modified?: string,
}
const AddData = () => {
  const dispatch = useDispatch();
  const [mode, setmode] = useState<string>("add");
  const [updateTodo, setupdateTodo] = useState<updateTodotyp>({ data: "", id: 0 });
  const todoLists = useSelector((state: RootState) => state.crudredux.arrayData);

  const postData = (val: any) => {
    dispatch(add(val));
    toast.success('Success Fully Data Added!', {
      position: toast.POSITION.TOP_RIGHT
  });
  }
  const updateData = (args: any) => {
    updateTodo.data = args;
    dispatch(update(updateTodo));
    setmode("add");
    toast.success('Success Fully Data Updated!', {
      position: toast.POSITION.TOP_RIGHT
  });
  }

  const addDataSchema: addDataSchema = {
    tododata: "",
    modified: "",
  }
  const addDataSchemanon: addDataSchema = {
    tododata: "",
    modified: "",
  }

  return (
    <div className='bg-blue-500 hover:bg-red-500 transition-colors duration-300  shadow-xl   min-h-screen flex items-center    justify-center'>
      <div className='w-96 h-full  shadow-xl bg-white rounded-md  p-3'>
        <div>
          <Formik
            initialValues={mode == "add" ? addDataSchema : addDataSchemanon}
            validationSchema={mode === "add" ? todoschema : todoupdateschema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              { mode === "add" && postData(values.tododata); }
              { mode !== "add" && updateData(values.modified) }
            }}
          >
            {({ errors, touched }) => (
              <div >
                <h1 className="text-center m-2 text-red-600">CRUD OPERATION</h1>
                <div className="">
                  <Form>
                    <div>
                      {mode === "add" && <div >
                        <div className='m-4'>
                          <label htmlFor="tododata" className='text-center '><h4 >INSERT </h4></label>
                        </div>
                        <div className='text-center'>
                          <Field name="tododata" id="tododata" type="text" placeholder="insert Data" className="mt-1 block mx-auto px-5 py-1 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
                                                                                                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                                                       disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                                                                                       invalid:border-pink-500 invalid:text-pink-600
                                                                                                       focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
                          {errors.tododata && touched.tododata ? <div style={{ color: "red" }}>{errors.tododata}</div> : null}
                        </div>
                      </div>}
                      {

                        mode !== "add" && <div >
                          <div className="text-center mt-2">
                            <label htmlFor="updatetodo"><h3 className='uppercase'>update </h3></label>

                          </div>
                          <div className="text-xl ">
                            <h5 className="text-center w-full bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">{updateTodo.data}</h5>
                            <h5><AiOutlineArrowDown className="text-center mx-auto" /></h5>
                          </div>
                          <div className="text-center m-2">
                            <Field name="modified" id="updatetodo" type="text" placeholder="update Data" className="mt-1 block mx-auto px-5 py-1 bg-white border border-slate-800 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"  />
                            {errors.modified && touched.modified ? <div style={{ color: "red" }}>{errors.modified}</div> : null}
                          </div>
                        </div>
                      }
                    </div>
                    <div className='text-center'>
                      <button className="rounded-full text-green-100 text-center m-4 px-20 p-2 bg-lime-600 cursor-pointer" type="submit">Submit</button>
                    </div>
                    {
                      mode !== "add" && <div className='text-center' >
                        <button className="rounded-full text-green-100 text-center  px-20 p-2 bg-red-600 cursor-pointer text-center mb-2 " type="button" onClick={() => setmode("add")}>cancel</button>
                      </div>
                    }

                    {todoLists && todoLists.length === 0 && <div className='border-orange-600 w-80 h-40 overflow-auto border-2 border-solid mx-auto  items-center  justify-center mb-2 flex '>
                      <h1 className=' text-center m-auto' > No Data Found</h1>
                    </div>}

                    {todoLists && todoLists.length > 0 && <div className=' border-orange-600 w-80 h-40 mb-5 overflow-auto border-2 border-solid mx-auto'>
                      <Listout todolist={todoLists} updateData={setupdateTodo} modeChange={setmode} />
                    </div>}
                  </Form>
                </div>
              </div>
            )}
          </Formik>

        </div>
      </div>

    </div>
  )
}

export default AddData;