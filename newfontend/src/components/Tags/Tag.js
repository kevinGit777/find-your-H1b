import React from 'react';
import {TagRow} from './TagRow';



export const Tag = ({Info,deleteCompanyInfo}) =>{
    const keys = [];
    for (const key in Info[0]){
        keys.push(key);
        // alert(keys);    
    }
    const buttonshowup = keys.includes("state") ? true : false;


    return (
        <div>
            <table border="1" cellSpacing="5">
            <tr className='setrow'>
                {keys.map(key => (
                    <th>{key}</th>
                ))}
                {buttonshowup && <th>Action</th>}
            </tr>
                {Info.map((tmp) => (
                    <TagRow row={tmp} deleteCompanyInfo={deleteCompanyInfo} buttonshowup={buttonshowup}/>
                )
                )}
            </table>            
        </div>
    )
}