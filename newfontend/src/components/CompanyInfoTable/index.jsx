import { Space, Table, Button } from 'antd';
import React,{useState} from 'react';
const { Column } = Table;


export const CompanyInfoTable = ({companyInfo}) => {

    const [info, setInfo] = useState([]);


    const DeleteCompanyInfo = (key) =>{
        alert(key);
    }

    return (
        <Table dataSource={info} pagination={false} bordered   >
      
      
          <Column title="Company_Name" dataIndex="companyName" key="companyName"/>
          <Column title="Company_Id" dataIndex="companyId" key="companyId"/>
          <Column title="State" dataIndex="state" key="state"/>
          <Column title="City" dataIndex="city" key="city"/>
          <Column title="Street" dataIndex="street" key="street"/>
          <Column title="Zipcode" dataIndex="zipCode" key="zipCode"/>
          <Column title="Job_Title" dataIndex="jobTitle" key="jobTitle"/>
      
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                  <Button type="primary" size='small' onClick={()=>DeleteCompanyInfo(record.key)}>Delete</Button>
              </Space>
            )}
          />
        </Table>
      );

}






