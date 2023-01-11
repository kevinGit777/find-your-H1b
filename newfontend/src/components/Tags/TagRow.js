import React from 'react';


export const TagRow =({row,deleteCompanyInfo,buttonshowup})=>{
    const handleDelete = (id) =>{
        deleteCompanyInfo(id);
    }
    // alert(Object.values(row));
    const vals = [];
    Object.values(row).forEach(element => {
        vals.push(element);
    });
    

    return (
        <tr className='setrow'>
            {vals.map(element => (
                <td>{element}</td>
            ))}
           {buttonshowup &&
            <td>
                <button onClick={()=>handleDelete(row.companyId)} >Delete</button>
            </td>
            }

        </tr>
    )

}

