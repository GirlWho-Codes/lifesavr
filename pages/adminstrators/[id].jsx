import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ToyAvatar from '../../assets/img/toy-avatar.png';
import { Layout, SVG } from '../../components';
import {
   
   PersonalInfo,
   PersonalSaving,
   
} from '../../components/sections/goals';
import person2 from '../../assets/img/person2.png';

/**
 * This is a getServerSideProps function thats help fetch users from server before the page loads
 */
export async function getServerSideProps(ctx) {
   const {
      query: { id },
   } = ctx;
   const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
      const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;
   const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/view-admin/${id}`,
      {
         headers: {
            Authorization: `Bearer ${bearerToken}`,
            "device-token": deviceToken
         }
      }
      
   )
   .then((res) => {
      
      return{
         props: {
            adminData: res.data.data
         }
         
      }
      
   })
   .catch((error) => {
      
      return{
         props: {
            adminData: null
         }
      }
   });
   
   return res
   
}

export default function GoalSavings({ adminData }) {
    console.log(adminData)
    
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState(0);

   const tabs = [
      {
         heading: 'Fixed saving details',
         // component: <PersonalInfo adminData={adminData} />,
      },
      {
         heading: 'Transactions',
         // component: <PersonalSaving adminData={adminData} />,
      },
   
   ];

   return (
      <Layout title='Administrator'>
         <div className='md:flex md:justify-between md:items-center mb-3 lg:mb-5'>
            <div>
               <h3 className='text-black-80 font-bold text-lg lg:text-2xl xl:text-[32px] tracking-[-0.05em] xl:leading-[48px]'>
                  Admin details
               </h3>
            </div>
                      
         </div>
         <div className="p-5 col-span-1 flex flex items-center justify-between gap-5 rounded-xl h-full border-2 border-[#FF4500]">
          {/* <div className='flex flex-row gap-80 items-stretch justify-between'> */}
          <div className='flex justify-center items-center gap-5 sm:gap-10'>
               <Image
                  className='w-full h-full'
                  src={
                     adminData?.profile_phone ? adminData.profile_phone : person2
                  }
                  alt='lifesaver user'
               />
               <span className='text-lg sm:text-xl font-bold'>{adminData?.first_name + " " + adminData?.last_name}</span>
            </div>
             <div className="">
                <p className='text-sm sm:text-xl'>Role</p>
                <p className='text-xs sm:text-xl'>{adminData.role.name}</p>
             </div>
          {/* </div> */}
            </div>
 
            <div className='mt-10 flex flex-col gap-7 flex-[50%]  font-medium text-slate-400'>
             <div className='flex gap-20'>
             <p>Email</p>
             <p>{adminData.email}</p>
             </div>
             <div style={{border: '1px solid #ccc'}} />
             
             <div className='flex gap-20'>
             <p>Phone</p>
             <p>{adminData.phone_number}</p>
             </div>
             <div style={{border: '1px solid #ccc'}} />
             
             <div className='flex gap-20'>
             <p>Gender</p>
             <p>{adminData.gender}</p>
             </div>
             <div style={{border: '1px solid #ccc'}} />
             
             <div className='flex gap-11 '>
             <p>Priviledges</p>
             <p>{adminData?.role?.privileges?.map((item) => <ul>{item.name}</ul>)}</p>
             </div>
             
            </div>
           
 
         
      </Layout>
   );
}
