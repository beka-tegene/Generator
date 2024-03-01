import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { Delete } from '@mui/icons-material';
import { setRegisterGen, setUpdateIdGen } from '../Store/Hook/GenHook';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
const GenRegister = ({ editData }) => {
  const [section, setSection] = useState(1);

  const [model_manufactural, setModel_manufactural] = useState(editData?.model_manufactural)
  const [model_number, setModel_number] = useState(editData?.model_number)
  const [serial_number, setSerial_number] = useState(editData?.serial_number)
  const [capacity, setCapacity] = useState(editData?.capacity)
  const [engine_oil_capacity, setEngine_oil_capacity] = useState(editData?.engine_oil_capacity)
  const [coolant_capacity, setCoolant_capacity] = useState(editData?.coolant_capacity)
  const [battery_capacity, setBattery_capacity] = useState(editData?.battery_capacity)
  const [installation_date, setInstallation_date] = useState(editData?.installation_date)

  const [coordinatesLatitude, setCoordinatesLatitude] = useState(editData?.coordinates?.[0])
  const [coordinatesLongitude, setCoordinatesLongitude] = useState(editData?.coordinates?.[1])
  const [Region, setRegion] = useState(editData?.Region)
  const [district, setDistrict] = useState(editData?.district)
  const [pictures, setPictures] = useState([])

  const [service_date, setService_date] = useState('')
  const [details, setDetails] = useState('')
  const [workhour, setWorkhour] = useState('')

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const fileArray = Array.from(selectedFiles);
    setPictures([...pictures, ...fileArray]);
  };

  const handleDelete = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
  };

  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    setCoordinates([
      parseFloat(coordinatesLatitude),
      parseFloat(coordinatesLongitude),
    ]);
  }, [coordinatesLatitude, coordinatesLongitude]);

  const [service_history, setHistory] = useState([]);
  useEffect(() => {
    const updatedHistory = [{ service_date: service_date, details: details, workhour: workhour }];
    setHistory(updatedHistory);
  }, [service_date, details, workhour]);

  const validateAndProceed = () => {
    switch (section) {
      case 1:
        if (
          model_manufactural &&
          model_number &&
          serial_number &&
          capacity &&
          engine_oil_capacity &&
          coolant_capacity &&
          battery_capacity &&
          installation_date
        ) {
          setSection((prevSection) => prevSection + 1);
        } else {
          alert('Please fill in all the required fields.');
        }
        break;
      case 2:
        if (coordinatesLatitude && coordinatesLongitude && Region && district && pictures) {
          setSection((prevSection) => !editData ? prevSection + 1 : prevSection + 2);
        } else {
          alert('Please fill in all the required fields.');
        }
        break;
      case 3:
        if (service_date && details && workhour) {
          setSection((prevSection) => prevSection + 1);
        } else {
          alert('Please fill in all the required fields.');
        }
        break;
      default:
        break;
    }
  };
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const userId = jwt_decode(token)?.userId;
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("coordinates[0]", coordinates[0]);
    formData.append("coordinates[1]", coordinates[1]);
    formData.append("model_manufactural", model_manufactural);
    formData.append("model_number", model_number);
    formData.append("serial_number", serial_number);
    formData.append("capacity", capacity);
    formData.append("engine_oil_capacity", engine_oil_capacity);
    formData.append("coolant_capacity", coolant_capacity);
    formData.append("battery_capacity", battery_capacity);
    formData.append("installation_date", installation_date);
    formData.append("Region", Region);
    formData.append("district", district);
    formData.append("service_history", JSON.stringify(service_history));
    formData.append("userId", userId);
    if (editData) {
      dispatch(setUpdateIdGen(formData));
    } else {
      for (let i = 0; i < pictures.length; i++) {
        formData.append("pictures", pictures[i]);
      }
      dispatch(setRegisterGen(formData));
    }
  }
  return (
    <div className={`${section === 4 ? 'w-[700px]' : 'w-[500px]'} p-4`}>
      <h1 className='text-[28px] font-medium border-dashed border-b-2 border-[#776B5D]'>Generator Register</h1>
      <form
        className='w-[90%] m-auto flex items-center justify-start flex-col gap-2 py-2'
        onSubmit={submitHandler}
      >
        {section === 1 && (
          <>
            <p className='text-[24px] font-semibold text-[#B0A695]'>Detail</p>
            <div className='grid grid-cols-2 w-full gap-2'>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='modelManufacture' className='text-[14px]'>
                  Model Manufacture
                </label>
                <Input
                  name={'modelManufacture'}
                  id={'modelManufacture'}
                  data={model_manufactural}
                  setData={setModel_manufactural}
                  placeholder={'Enter model manufacture'}
                  type={'text'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='modelNumber' className='text-[14px]'>
                  Model Number
                </label>
                <Input
                  name={'modelNumber'}
                  id={'modelNumber'}
                  data={model_number}
                  setData={setModel_number}
                  placeholder={'Enter model number'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='serialNumber' className='text-[14px]'>
                  Serial Number
                </label>
                <Input
                  name={'serialNumber'}
                  id={'serialNumber'}
                  data={serial_number}
                  setData={setSerial_number}
                  placeholder={'Enter serial number'}
                  type={'text'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='capacity' className='text-[14px]'>
                  Capacity
                </label>
                <Input
                  name={'capacity'}
                  id={'capacity'}
                  data={capacity}
                  setData={setCapacity}
                  placeholder={'Enter capacity'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='engineOilCapacity' className='text-[14px]'>
                  Engine Oil Capacity
                </label>
                <Input
                  name={'engineOilCapacity'}
                  id={'engineOilCapacity'}
                  data={engine_oil_capacity}
                  setData={setEngine_oil_capacity}
                  placeholder={'Enter engine oil capacity'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='coolantCapacity' className='text-[14px]'>
                  Coolant Capacity
                </label>
                <Input
                  name={'coolantCapacity'}
                  id={'coolantCapacity'}
                  data={coolant_capacity}
                  setData={setCoolant_capacity}
                  placeholder={'Enter coolant capacity'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='batteryCapacity' className='text-[14px]'>
                  Battery Capacity
                </label>
                <Input
                  name={'batteryCapacity'}
                  id={'batteryCapacity'}
                  data={battery_capacity}
                  setData={setBattery_capacity}
                  placeholder={'Enter battery capacity'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='installationDate' className='text-[14px]'>
                  Installation Date
                </label>
                <Input
                  name={'installationDate'}
                  id={'installationDate'}
                  data={installation_date}
                  setData={setInstallation_date}
                  placeholder={'Enter installation date'}
                  type={'date'}
                />
              </div>
            </div>
          </>
        )}
        {section === 2 && (
          <>
            <p className='text-[24px] font-semibold text-[#B0A695]'>Location</p>
            <div className='grid grid-cols-2 w-full gap-2'>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='coordinatesLatitude' className='text-[14px]'>
                  Coordinates Latitude
                </label>
                <Input
                  name={'coordinatesLatitude'}
                  id={'coordinatesLatitude'}
                  data={coordinatesLatitude}
                  setData={setCoordinatesLatitude}
                  placeholder={'Enter coordinates latitude'}
                  type={'number'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='coordinatesLongitude' className='text-[14px]'>
                  Coordinates Longitude
                </label>
                <Input
                  name={'coordinatesLongitude'}
                  id={'coordinatesLongitude'}
                  data={coordinatesLongitude}
                  setData={setCoordinatesLongitude}
                  placeholder={'Enter coordinates longitude'}
                  type={'number'}
                />
              </div>
            </div>
            <div className='flex flex-col items-start justify-start w-full'>
              <label htmlFor='region' className='text-[14px]'>
                Region
              </label>
              <select
                name='region'
                id='region'
                className='px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
                onChange={(e) => setRegion(e.target.value)}
                value={Region}
                defaultValue=""
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
            <div className='flex flex-col items-start justify-start w-full'>
              <label htmlFor='district' className='text-[14px]'>
                District
              </label>
              <select
                name='district'
                id='district'
                className='px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                defaultValue=""
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
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='pictures' className='text-[14px]'>
                  Pictures
                </label>
                <input
                  name={'pictures'}
                  className=' px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
                  id={'pictures'}
                  onChange={handleFileChange}
                  placeholder={'Enter pictures'}
                  multiple={true}
                  accept="image/jpeg, image/png, image/jpg"
                  type={'file'}
                />
                {pictures.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {pictures.map((picture, index) => (
                      <div key={index} className=' relative h-[13vh] overflow-hidden'>
                        <Delete sx={{ color: "red", fontSize: "13px" }} className=' absolute top-0 right-0 cursor-pointer' onClick={() => handleDelete(index)} />
                        <img src={URL.createObjectURL(picture)} alt={`pic-${index}`} className='max-w-[100px] h-auto' />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {section === 3 && !editData && (
          <>
            <p className='text-[24px] font-semibold text-[#B0A695]'>Service History</p>
            <div className='grid grid-cols-2 w-full gap-2'>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='serviceDate' className='text-[14px]'>
                  Service Date
                </label>
                <Input
                  name={'serviceDate'}
                  id={'serviceDate'}
                  data={service_date}
                  setData={setService_date}
                  placeholder={'Enter service date'}
                  type={'date'}
                />
              </div>
              <div className='flex flex-col items-start justify-start w-full'>
                <label htmlFor='workHour' className='text-[14px]'>
                  Work Hour
                </label>
                <Input
                  name={'workHour'}
                  id={'workHour'}
                  data={workhour}
                  setData={setWorkhour}
                  placeholder={'Enter work hour'}
                  type={'number'}
                />
              </div>
            </div>
            <div className='flex flex-col items-start justify-start w-full'>
              <label htmlFor='details' className='text-[14px]'>
                Detail
              </label>
              <textarea
                name={'details'}
                id={'details'}
                className=' px-5 py-2 rounded outline-none border-[1px] border-[#B0A695] w-full'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={'Enter details'}
                type={'text'}
                cols={5}
                rows={5}
              ></textarea>
            </div>
          </>
        )}
        {section === 4 && (
          <>
            <p className='text-[24px] font-semibold text-[#B0A695]'>Review the register data</p>
            <>
              <p className='text-[18px] font-normal text-[#b7b6b4] border-solid border-b-2 border-[#b7b6b4]'>Detail</p>
              <div className='grid grid-cols-2 w-full gap-2'>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Manufacture : </span>
                  <span> {model_manufactural}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Model Number : </span>
                  <span> {model_number}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Serial Number : </span>
                  <span> {serial_number}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Capacity : </span>
                  <span> {capacity}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Engine oil Capacity : </span>
                  <span> {engine_oil_capacity}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Coolant Capacity : </span>
                  <span> {coolant_capacity}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Battery Capacity : </span>
                  <span> {battery_capacity}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Installation Date : </span>
                  <span> {installation_date}</span>
                </div>
              </div>
            </>
            <>
              <p className='text-[18px] font-normal text-[#b7b6b4] border-solid border-b-2 border-[#b7b6b4]'>Location</p>
              <div className='grid grid-cols-2 w-full gap-2'>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Coordinates Latitude : </span>
                  <span> {coordinatesLatitude}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Coordinates Longitude : </span>
                  <span> {coordinatesLongitude}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Region : </span>
                  <span> {Region}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>District : </span>
                  <span> {district}</span>
                </div>
                {!editData && (
                  <div>
                    <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Pictures</span>
                    <div className='grid grid-cols-3 w-full gap-2'>
                      {pictures.map((picture, index) => (
                        <div key={index} className=' w-[100px] max-w-[100px] min-w-[100px] h-[13vh] overflow-hidden'>
                          <img src={URL.createObjectURL(picture)} alt={`pic-${index}`} className='w-full h-auto' />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
            {!editData && <>
              <p className='text-[18px] font-normal text-[#b7b6b4] border-solid border-b-2 border-[#b7b6b4]'>Service History</p>
              <div className='grid grid-cols-2 w-full gap-2'>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Service Date : </span>
                  <span> {service_date}</span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Detail : </span>
                  <span> {details}
                  </span>
                </div>
                <div>
                  <span className='font-normal text-[#b7b6b4] border-solid border-b-2 '>Work Hour : </span>
                  <span> {workhour} hour</span>
                </div>
              </div>
            </>}
          </>
        )}
        <div className='grid grid-cols-2 w-full gap-2'>
          {section > 1 && (
            <button
              type='button'
              onClick={() => {
                const prevSection = editData ? section - 1 : section - 2;
                setSection(prevSection);
              }}
              className='w-full p-2 bg-[#776B5D] text-[#F3EEEA] font-medium rounded-[5px]'
            >
              Back
            </button>
          )}
          {section === 1 && <div></div>}
          {section < 4 && (
            <button
              type='button'
              onClick={validateAndProceed}
              className='w-full p-2 bg-[#776B5D] text-[#F3EEEA] font-medium rounded-[5px]'
            >
              Next
            </button>
          )}
          {section === 4 && (
            <button
              type='submit'
              onClick={submitHandler}
              className='w-full p-2 bg-[#776B5D] text-[#F3EEEA] font-medium rounded-[5px]'
            >
              {editData ? 'Update' : 'Register'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GenRegister