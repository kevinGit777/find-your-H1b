import React from 'react';
import {Checkbox} from 'antd';


export const TagRow =({row,deleteCompanyInfo,buttonshowup})=>{
    const handleDelete = (id) =>{
        deleteCompanyInfo(id);
    }
    // alert(Object.values(row));
    const vals = [];
    Object.values(row).forEach(element => {
        vals.push(element);
    });
    const onChange = () =>{

    }
    

    return (
        <tr className='setrow'>
            {vals.map(element => (
                <td>{element}</td>
            ))}
           {buttonshowup &&
            <td>
                { <button onClick={()=>handleDelete(row.companyid)} >Delete</button> }
                {/* {<Checkbox onChange={onChange}/>} */}
            </td>
            }

        </tr>
    )

}

