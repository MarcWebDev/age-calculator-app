"use client";

import Image from "next/image";
import {SetStateAction, Dispatch, useState} from "react";

function isLeapYear(year: number) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

export default function Home() {
  const [day, setDay] = useState<string | number>();
  const [month, setMonth] = useState<string | number>();
  const [year, setYear] = useState<string | number>()

  const [dayError, setDayError] = useState<string>("");
  const [monthError, setMonthError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");

  const [calculatedYears, setCalculatedYears] = useState<string | number>("- -");
  const [calculatedMonths, setCalculatedMonths] = useState<string | number>("- -");
  const [calculatedDays, setCalculatedDays] = useState<string | number>("- -");

  function setNumber(text: string, setter: Dispatch<SetStateAction<string | number | undefined>>, limit: number) {
      if (text.length > limit) return;

      const cleanedStr = text.replace(/\D/g, '');
      const num = parseInt(cleanedStr, 10);

      if (!cleanedStr || isNaN(num)) {
          setter('');
      } else {
          setter(num);
      }
  }

  function calculateAge() {
      // Reset errors
      setDayError("");
      setMonthError("");
      setYearError("");

      // Check if every field has a value
      if (!day || day === "") setDayError("This field is required");
      if (!month || month === "") setMonthError("This field is required");
      if (!year || year === "") setYearError("This field is required");

      // Return if a field is empty
      if (dayError.length > 0 || monthError.length > 0 || yearError.length > 0) return;

      const currentDate = new Date();

      if (Number(day) > 31) setDayError("Must be a valid day");
      if (Number(month) > 12) setMonthError("Must be a valid month");
      if (Number(year) > currentDate.getFullYear()) setYearError("Must be in the past");

      // Return if a field is invalid
      if (dayError.length > 0 || monthError.length > 0 || yearError.length > 0) return;

      // Check if month has 30 days
      if (month === 4 || month === 6 || month === 9 || month === 11) {
          if (Number(day) > 30) setDayError("Must be a valid date");
      }

      // Check for February
      if (month === 2) {
          // Check if leap year
          if (isLeapYear(Number(year))) {
              if (Number(day) > 29) setDayError("Must be a valid date");
          } else {
              if (Number(day) > 28) setDayError("Must be a valid date");
          }
      }

      if (dayError.length > 0) return;

      // Calculate the age
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      let ageYears = currentYear - Number(year);
      let ageMonths = currentMonth - Number(month);
      let ageDays = currentDay - Number(day);

      // Check if month is in future
      if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
          ageYears--;
          ageMonths += 12; // Wrap around the months
      }

      // Check if day is in future
      if (ageDays < 0) {
          // Get the previous month's days count
          const previousMonth = currentMonth - 1 < 1 ? 12 : currentMonth - 1;
          const daysInPreviousMonth = new Date(currentYear, previousMonth, 0).getDate();
          ageDays += daysInPreviousMonth;
          ageMonths--;
      }

      setCalculatedDays(ageDays);
      setCalculatedMonths(ageMonths);
      setCalculatedYears(ageYears);
  }

  return (
   <div className="w-[100vw] min-h-[100vh] flex items-center justify-center">
     <div className="max-w-[840px] w-full bg-white rounded-[24px_24px_200px_24px] max-[750px]:rounded-[24px_24px_100px_24px] p-[56px] max-[750px]:p-6 m-4">
         <div className="flex">
             <label htmlFor="day" className="flex flex-col">
                 <span
                     className={`${dayError.length > 0 ? 'text-red' : 'text-grey'} text-sm max-[750px]:text-[12px] leading-normal font-bold tracking-[3.5px] mb-2`}>DAY</span>
                 <input id="day" type="text" placeholder="DD" value={day}
                        onChange={(e) => setNumber(e.target.value, setDay, 2)}
                        className={`text-black ${dayError.length > 0 ? 'border-red hover:border-red focus:border-red' : 'border-line hover:border-purple focus:border-purple'} text-[32px] max-[750px]:text-[20px] border rounded-lg font-bold leading-normal tracking-[0.32px] outline-none ring-0 max-w-[160px] w-full py-3 px-6 max-[750px]:px-4 transition ease-in-out duration-200 placeholder:text-[#8A8A8A]`}/>
                 <p className={`text-red text-sm font-normal leading-normal italic mt-2 ${dayError.length > 0 ? 'block' : 'hidden'}`}>{dayError}</p>
             </label>

             <label htmlFor="month" className="flex flex-col mx-8 max-[750px]:mx-4">
                 <span
                     className={`${monthError.length > 0 ? 'text-red' : 'text-grey'} text-sm max-[750px]:text-[12px] leading-normal font-bold tracking-[3.5px] mb-2`}>MONTH</span>
                 <input id="month" type="text" placeholder="MM" value={month}
                        onChange={(e) => setNumber(e.target.value, setMonth, 2)}
                        className={`text-black ${monthError.length > 0 ? 'border-red hover:border-red focus:border-red' : 'border-line hover:border-purple focus:border-purple'} text-[32px] max-[750px]:text-[20px] border rounded-lg font-bold leading-normal tracking-[0.32px] outline-none ring-0 max-w-[160px] w-full py-3 px-6 max-[750px]:px-4 transition ease-in-out duration-200 placeholder:text-[#8A8A8A]`}/>
                 <p className={`text-red text-sm font-normal leading-normal italic mt-2 ${monthError.length > 0 ? 'block' : 'hidden'}`}>{monthError}</p>
             </label>

             <label htmlFor="year" className="flex flex-col">
                 <span
                     className={`${yearError.length > 0 ? 'text-red' : 'text-grey'} text-sm max-[750px]:text-[12px] leading-normal font-bold tracking-[3.5px] mb-2`}>YEAR</span>
                 <input id="year" type="text" placeholder="YYYY" value={year}
                        onChange={(e) => setNumber(e.target.value, setYear, 4)}
                        className={`text-black ${yearError.length > 0 ? 'border-red hover:border-red focus:border-red' : 'border-line hover:border-purple focus:border-purple'} text-[32px] max-[750px]:text-[20px] border rounded-lg font-bold leading-normal tracking-[0.32px] outline-none ring-0 max-w-[160px] w-full py-3 px-6 max-[750px]:px-4 transition ease-in-out duration-200 placeholder:text-[#8A8A8A]`}/>
                 <p className={`text-red text-sm font-normal leading-normal italic mt-2 ${yearError.length > 0 ? 'block' : 'hidden'}`}>{yearError}  </p>
             </label>
         </div>

         <div className="w-full flex items-center max-[750px]:justify-center max-[750px]:my-[calc((64px/2)+32px)] ">
             <div className="h-[1px] w-[calc(100%-96px)] bg-line max-[750px]:w-full"></div>
             <div onClick={() => calculateAge()}
                  className="w-[96px] max-[750px]:absolute h-[96px] max-[750px]:w-16 max-[750px]:h-16 rounded-[100%] bg-purple flex items-center justify-center cursor-pointer transition ease-in-out duration-200 hover:bg-black">
                 <Image
                     src={"/icon-arrow.svg"} alt={"Arrow"} width={44} height={44} className="max-[750px]:w-6 max-[750px]:h-6" /></div>
         </div>

         <div>
             <p className="text-black text-[104px] italic font-extrabold leading-[110%] tracking-[-2.08px] max-[750px]:text-[56px]"><span
                 className="text-purple mr-1">{calculatedYears}</span> years</p>
             <p className="text-black text-[104px] italic font-extrabold leading-[110%] tracking-[-2.08px] max-[750px]:text-[56px]"><span
                 className="text-purple mr-1">{calculatedMonths}</span> months</p>
             <p className="text-black text-[104px] italic font-extrabold leading-[110%] tracking-[-2.08px] max-[750px]:text-[56px]"><span className="text-purple mr-1">{calculatedDays}</span> days</p>
         </div>
     </div>
   </div>
  );
}
