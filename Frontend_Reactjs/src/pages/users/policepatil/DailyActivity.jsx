import UsersNavbar from "../../../component/UsersNavbar";

import BackClick from "../../../component/BackClick";
import Location from "../../../component/Location";

function DailyActivity() {


  // const onSubmit = async () =>{


  //   try(
  //     const submitData = await axios.post(
        
  //     )
  //   )
  // }
  
  return (
    <div className="font-sans">
      <UsersNavbar />
      <div className="grid grid-cols-3 align-middle justify-center  items-center border-1 h-15  font-semibold ">
        <div className="w-1/2 col-start-2 flex gap-2 align-middle items-center">
          <BackClick />
          Daily Activity Report
        </div>
      </div>
      <div className="flex  align-middle justify-center py-5 w-full  ">
        <form className=" grid p-2 gap-6  w-1/3 ">
          <div className="grid gap-2 ">
            <label htmlFor="date">Report Date</label>
            <input
              className="border-1 border-gray-300 rounded p-3"
              type="date"
              id="date"
            />
          </div>
          <div className="grid gap-2 p-2 border-1 border-gray-300 rounded p-3">
            <select className="grid gap-2 p-2 border border-none" name="" id="">
              <option value="">Select Category</option>
              <option value="">Meeting</option>
              <option value="">Awereness</option>
              <option value="">Dispute Resolution</option>
              <option value="">Surveillance</option>
              <option value="">Other</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="descriptions">Add Descriptions</label>

            <textarea
              className="border-1 border-gray-300 rounded  "
              name="aasasds"
              id="descriptions"
              rows={5}
              cols={50}
            ></textarea>
          </div>
          <Location />
          <div className="flex flex-col ">
            <label
              className="flex align-middle items-center gap-2 "
              htmlFor="uploadPhoto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-camera w-4 h-4"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
              Choose an Image
            </label>

            <div className=" flex flex-col border-1 border-dashed border-gray-500 w-1/3 h-20 hover:bg-gray-300 align-middle justify-center ">
              <input type="file" id="uploadPhoto" name="" accept="image" />
            </div>
          </div>
          <button className="flex border-1 bg-blue-950 w-full align-middle justify-center p-4 rounded text-white font-bold  " >
            
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DailyActivity;
