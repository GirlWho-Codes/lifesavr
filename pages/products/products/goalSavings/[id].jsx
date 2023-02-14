import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ToyAvatar from '../../../../assets/img/toy-avatar.png';
import { Layout, SVG } from '../../../../components';
import {
   
   PersonalInfo,
   PersonalSaving,
   
} from '../../../../components/sections/goals';

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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/view-goal-savings/${id}`,
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
            goalData: res.data.data
         }
         
      }
      
   })
   .catch((error) => {
      
      return{
         props: {
            goalData: null
         }
      }
   });
   
   return res
   
}

export default function GoalSavings({ goalData }) {
    console.log(goalData)
    
   const router = useRouter();
   const [currentTab, setCurrentTab] = useState(0);

   const tabs = [
      {
         heading: 'Fixed saving details',
         component: <PersonalInfo goalData={goalData} />,
      },
      {
         heading: 'Transactions',
         component: <PersonalSaving goalData={goalData} />,
      },
   
   ];

   return (
      <Layout title={'Goal Safe'}>
         <section className='space-y-4'>
            <div
               onClick={() => router.back()}
               className='start space-x-3 text-xs cursor-pointer'
            >
               <i className='text-xs'>
                  <SVG.ArrowBack />
               </i>
               <span>Back</span>
            </div>
            <div className='start space-x-5'>
               <Image
                  src={
                     goalData?.profile_phone ? goalData.profile_phone : ToyAvatar
                  }
                  alt='lifesaver user'
               />
               <span className='text-xl font-bold'>{goalData.goal_savings.withdrawal_account_details?.account_name}</span>
            </div>
            <div className='flex text-[#1E1E24] flex-col p-6 bg-[#FFE6D6] bg-userPannel-pattern bg-left bg-no-repeat rounded-2xl gap-3'>
               <span className='text-sm font-medium xl:text-base xl:leading-[20px]'>
                  Goal Safe balance
               </span>
               <span className='xl:leading-[50.72px] tracking-[-0.05em] xl:my-2 xl:text-[40px] font-medium'>
                  #{goalData.goal_savings.current_balance}
               </span>
            </div>
         </section>
         <section className='my-5 '>
            <div className='container w-full'>
               <div className='flex items-start justify-start lg:justify-evenly min-w-full p-0 border-b-[1px] border-solid border-slate-400 space-x-[8rem] overflow-x-auto overflow-y-hidden no-scrollbar'>
                  {tabs.map((tab, i) => (
                     <div
                        key={i}
                        onClick={() => setCurrentTab(i)}
                        className='cursor-pointer'
                     >
                        <div
                           className={`py-2 whitespace-nowrap ${
                              currentTab === i
                                 ? 'font-semibold text-[#1E1E24]'
                                 : 'text-[#676767]'
                           }`}
                        >
                           {tab.heading}
                        </div>
                        <hr
                           className={`p-0 m-0 border-solid rounded-sm -mb-[1px] ${
                              currentTab === i &&
                              'border-[2px] border-orange bg-orange'
                           }`}
                        />
                     </div>
                  ))}
               </div>
            </div>

            <div>{tabs[currentTab].component}</div>
         </section>
      </Layout>
   );
}
