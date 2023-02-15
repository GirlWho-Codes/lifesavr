import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  SVG } from '../index';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable, SubPageHeader, Layout } from '../../components';
import { useRouter } from 'next/router';

export const PersonalInfo = ({ cliqueData }) => {
   const router = useRouter();
   const details = [
      { title: 'Safe method', value: cliqueData?.clique_savings.name },
      { title: 'Fund source', value: cliqueData.clique_savings?.deposit_account_type },
      { title: 'Preferred save frequency', value: cliqueData.clique_savings?.autosave_settings?.deposit_frequency
   }, 
      { title: 'Target amount', value: cliqueData.clique_savings?.autosave_settings?.deposit_amount
   },
      { title: 'Start date', value: cliqueData.clique_savings?.autosave_settings?.start_date },
      { title: 'Withdrawal method', value: cliqueData.clique_savings?.withdrawal_account_details?.bank_name },
      { title: 'Withdrawal date', value: cliqueData?.clique_savings.withdrawal_day
   },
      // { title: 'State', value: cliqueData.null },
      // { title: 'Country', value: cliqueData.null },
   ];

   

  

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}

         {/* <div className='start py-4'>
            <Button
               startIcon={<SVG.WarningIcon />}
               onClick={handleDeactivateAccount}
               className='bg-[#CF4655] normal-case hover:bg-[#ab313f] p-3 rounded-lg text-white center gap-2'
            >
               Disable Account
            </Button>
         </div> */}
      </div>
   );
};

export const PersonalSaving = ({cliqueData }) => {
   
   console.log(
      cliqueData
   );
   
   function BasicMenu({ viewLink = '', id = '' }) {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const open = Boolean(anchorEl);

      const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
         setAnchorEl(null);
      };


      const handleDeactivateAccount = async () => {
         setAnchorEl(null);
         
         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
         const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
         const deviceToken = process.env.NEXT_PUBLIC_DEVICE_TOKEN;

         const instance = axios.create({
            baseURL: `${baseUrl}`,
            headers: {
               Authorization: `Bearer ${bearerToken} `,
               "device-token": deviceToken
            }
         });
        
         await instance
            .post(`/api/v1/admin/users/delete/${id}`, {status: 'deactivated'})
            
            .then((res) => {
               console.log(res);
               
               router.replace(router.asPath)
               toast.success('User deactivated successfully');
               

               return res.data
               
            })
            .catch((err) => {
               console.log(err);
              
            });
      };

      return (
         <div>
            <IconButton
               className='p-2'
               aria-controls={open ? 'basic-menu' : undefined}
               aria-haspopup='true'
               aria-expanded={open ? 'true' : undefined}
               onClick={handleClick}
            >
               <SVG.DotsHambugger />
            </IconButton>
            <Menu
               anchorEl={anchorEl}
               open={open}
               onClose={handleClose}
               MenuListProps={{
                  'aria-labelledby': 'basic-button',
               }}
               sx={{
                  '& .MuiList-root': {
                     padding: 0,
                  },
               }}
            >
               <div className='flex'>
                  <MenuItem onClick={handleClose} className='p-0'>
                     <Link href={viewLink}>
                        <a className='p-4'>
                           <SVG.View />
                        </a>
                     </Link>
                  </MenuItem>
                                   
               </div>
            </Menu>
         </div>
      );
   }


   const columns = React.useMemo(
      () => [
         {
            Header: 'Action',
            accessor: 'action',
            
         },
         
         {
            Header: 'Amount',
            accessor: 'amount',
            // Cell: ({ value }) => (
            //    <CurrencyFormat
            //       value={value}
            //       displayType={'text'}
            //       thousandSeparator={true}
            //       prefix={'₦'}
            //    />
            // ),
         },

         {
            Header: 'Transaction Medium',
            accessor: 'medium',
         },
        
         {
            Header: 'Date',
            accessor: 'date',
         },
         {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => {
               return (
                  <span
                     className={`px-2.5 py-1 lg:px-5 lg:py-2 rounded-full ${
                        value === 'successful'
                           ? 'text-[#4AAE8C] bg-[#DEFFEE]'
                           : value === 'pending'
                           ? 'text-[#F7936F] bg-[#FDF6EF]'
                           : 'text-[#F16063] bg-[#FCEAE8]'
                     }`}
                  >
                     {value}
                  </span>
               );
            },
         },
        
      ],
      []
   );

 

   /**
    * Datagrid row data
    */
   let rows = [];
//    if (cliqueData.clique_savings) {
//       const transactionHistory = cliqueData.clique_savings.transaction_history;
   
//       rows = transactionHistory?.map(transaction => ({
//          medium: transaction?.payment_type.toUpperCase(),
//          amount: transaction?.amount,
//          paymentMethod: transaction?.payment_type,
//          date: transaction?.transaction_time,
//          status: transaction?.status,
//          action: transaction?.transaction_type.toUpperCase()
//       }));
//    }





   console.log(rows)
   

  
   return (
      <div className='mt-3'>
      

         

         <DataTable
            columns={columns}
            data={rows}
           
         />

      </div>
   );
         }

export const GroupSaving = ({ cliqueData = {} }) => {
   const details = [
      { title: 'Group name', value: cliqueData.null },
      { title: 'Payment frequency', value: cliqueData.null },
      { title: 'Member limit', value: cliqueData.null },
      { title: 'Target amount', value: cliqueData.null },
      { title: 'Monthly deposit', value: cliqueData.null },
      { title: 'Debit day', value: cliqueData.null },
      { title: 'Start day', value: cliqueData.null },
      { title: 'Stop date', value: cliqueData.null },
      { title: 'Withdrawal type', value: cliqueData.null },
      { title: 'Withdrawal account', value: cliqueData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const FixedSaving = ({ cliqueData = {} }) => {
   const details = [
      { title: 'Group name', value: cliqueData.null },
      { title: 'Payment frequency', value: cliqueData.null },
      { title: 'Member limit', value: cliqueData.null },
      { title: 'Target amount', value: cliqueData.null },
      { title: 'Monthly deposit', value: cliqueData.null },
      { title: 'Debit day', value: cliqueData.null },
      { title: 'Start day', value: cliqueData.null },
      { title: 'Stop date', value: cliqueData.null },
      { title: 'Withdrawal type', value: cliqueData.null },
      { title: 'Withdrawal account', value: cliqueData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const GoalSaving = ({ cliqueData = {} }) => {
   const details = [
      { title: 'Group name', value: cliqueData.null },
      { title: 'Payment frequency', value: cliqueData.null },
      { title: 'Member limit', value: cliqueData.null },
      { title: 'Target amount', value: cliqueData.null },
      { title: 'Monthly deposit', value: cliqueData.null },
      { title: 'Debit day', value: cliqueData.null },
      { title: 'Start day', value: cliqueData.null },
      { title: 'Stop date', value: cliqueData.null },
      { title: 'Withdrawal type', value: cliqueData.null },
      { title: 'Withdrawal account', value: cliqueData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const ThriftSaving = ({ cliqueData = {} }) => {
   const details = [
      { title: 'Group name', value: cliqueData.null },
      { title: 'Payment frequency', value: cliqueData.null },
      { title: 'Member limit', value: cliqueData.null },
      { title: 'Target amount', value: cliqueData.null },
      { title: 'Monthly deposit', value: cliqueData.null },
      { title: 'Debit day', value: cliqueData.null },
      { title: 'Start day', value: cliqueData.null },
      { title: 'Stop date', value: cliqueData.null },
      { title: 'Withdrawal type', value: cliqueData.null },
      { title: 'Withdrawal account', value: cliqueData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};

export const CliqueSaving = ({ cliqueData = {} }) => {
   const details = [
      { title: 'Group name', value: cliqueData.null },
      { title: 'Payment frequency', value: cliqueData.null },
      { title: 'Member limit', value: cliqueData.null },
      { title: 'Target amount', value: cliqueData.null },
      { title: 'Monthly deposit', value: cliqueData.null },
      { title: 'Debit day', value: cliqueData.null },
      { title: 'Start day', value: cliqueData.null },
      { title: 'Stop date', value: cliqueData.null },
      { title: 'Withdrawal type', value: cliqueData.null },
      { title: 'Withdrawal account', value: cliqueData.null },
   ];

   return (
      <div className='p-5 space-y-5 w-full max-w-lg'>
         {details.map((detail, i) => (
            <div key={i} className='flex items-center justify-between '>
               <div className='flex-[50%]  font-medium text-slate-400'>
                  {detail.title}
               </div>
               <div className='flex-[50%]  font-medium '>{detail.value}</div>
            </div>
         ))}
      </div>
   );
};
