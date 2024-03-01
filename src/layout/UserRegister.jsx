import React, { useState } from 'react'
import Input from '../Components/Input'
import { setRegister } from '../Store/Hook/AuthHook'
import { useDispatch } from 'react-redux';
import { setUpdateUser } from '../Store/Hook/UserHook';

const UserRegister = ({ editData }) => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(editData?.fullname)
  const [position, setPosition] = useState(editData?.position)
  const [email, setEmail] = useState(editData?.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(editData?.role)
  const [api_permission, setApi_permission] = useState(editData?.api_permission)
  const submitHandler = (e) => {
    e.preventDefault()
    if (editData) {
      dispatch(
        setUpdateUser({
          data: {
            id: editData?._id,
            fullname,
            position,
            email,
            role,
            api_permission,
          },
        })
      );
    } else {
      if (password === confirmPassword) {
        dispatch(
          setRegister({
            data: {
              fullname,
              position,
              email,
              password,
              role,
              api_permission,
            },
          })
        );
      } else {
        alert('Password not match')
      }
    }
  }

  return (
    <div className='w-[500px] p-4'>
      <h1 className='text-[28px] font-medium border-dashed border-b-2 border-[#776B5D]'>User {editData ? 'Update' : 'Register'}</h1>
      <form
        className='w-[90%] m-auto flex items-center justify-start flex-col gap-2 py-2'
        onSubmit={submitHandler}
      >
        <div className='grid grid-cols-2 w-full gap-2'>
          <div className='flex flex-col items-start justify-start w-full'>
            <label htmlFor="fullname" className='text-[14px]'>Full Name</label>
            <Input
              name={'fullname'}
              id={'fullname'}
              data={fullname}
              setData={setFullname}
              placeholder={"Enter fullname"}
              type={"text"}
            />
          </div>
          <div className='flex flex-col items-start justify-start w-full'>
            <label htmlFor="position" className='text-[14px]'>Position </label>
            <Input
              name={'position'}
              id={'position'}
              data={position}
              setData={setPosition}
              placeholder={"Enter your position"}
              type={"text"}
            />
          </div>
        </div>
        <div className='flex flex-col items-start justify-start w-full'>
          <label htmlFor="email" className='text-[14px]'>Email </label>
          <Input
            name={'email'}
            id={'email'}
            data={email}
            setData={setEmail}
            placeholder={"Enter your email"}
            type={"email"}
          />
        </div>
        <div className='flex flex-col items-start justify-start w-full'>
          <label htmlFor="role" className='text-[14px]'>User Type</label>
          <select name="role" id="role" className=' px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option disabled selected></option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Operator">Operator</option>
          </select>
        </div>
        <div className='flex flex-col items-start justify-start w-full'>
          <label htmlFor="api_permission" className='text-[14px]'>Api Permission</label>
          <select name="api_permission" id="api_permission" className=' px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
            onChange={(e) => setApi_permission(e.target.value)}
            value={api_permission}
          >
            <option disabled selected></option>
            <option value={"access_all"}>Access All</option>
            <option value={"Delete"}>Delete</option>
            <option value={"Update"}>Update</option>
            <option value={"Register"}>Register</option>
            <option value={"Register_and_Update"}>
              Register and Update
            </option>
            <option value={"Register_and_Delete"}>
              Register and Delete
            </option>
            <option value={"Delete_and_Update"}>Delete and Update</option>
            <option value={"Register_user"}>Register User</option>
            <option value={"read_only"}>Read Only</option>
          </select>
        </div>
        {!editData && (
          <div className='grid grid-cols-2 w-full gap-2'>
            <div className='flex flex-col items-start justify-start w-full'>
              <label htmlFor="password" className='text-[14px]'>Password </label>
              <Input
                name={'password'}
                id={'password'}
                data={password}
                setData={setPassword}
                placeholder={"Enter your password"}
                type={"password"}
              />
            </div>
            <div className='flex flex-col items-start justify-start w-full'>
              <label htmlFor="confirmPassword" className='text-[14px]'>Confirm Password </label>
              <Input
                name={'confirmPassword'}
                id={'confirmPassword'}
                data={confirmPassword}
                setData={setConfirmPassword}
                placeholder={"Enter your confirm Password"}
                type={"password"}
              />
            </div>
          </div>
        )}
        <div className='w-full'>
          <button type="submit" className='w-full p-2 bg-[#776B5D] text-[#F3EEEA] font-medium rounded-[5px]'>{editData ? 'Update' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}

export default UserRegister