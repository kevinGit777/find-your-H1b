import React,{useState} from 'react';
import { Layout,Table,Menu, Button} from 'antd';
import axios from 'axios';


const client = axios.create({
  baseURL: "http://localhost:80/"
})

export const FavoriteTab = (props) =>{
    useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);


    const columns = [
		{
		  title: 'CompanyName',
		  dataIndex: 'companyname',
		  align:'center',
		  width: 150
		},
		{
		  title: 'CompanyId',
		  dataIndex: 'companyid',
		  align:'center',
		  width:150
	  
		},
		{
		  title: 'State',
		  dataIndex: 'state',
		  align:'center',
		  width:150
	  
		},
		{
		  title: 'City',
		  dataIndex: 'city',
		  align:'center',
		  width:150
	  
		},
		{
		  title: 'Street',
		  dataIndex: 'street',
		  align:'center',
		  width:200
	  
		},
		{
		  title: 'ZipCode',
		  dataIndex: 'zipcode',
		  align:'center',
		  width:150
	  
		},
		{
		  title: 'JobTitle',
		  dataIndex: 'JobTitle',
		  align:'center',
		  width:150
	  
		},
	  ];

	  const [companyInfo, setCompnayInfo] = useState([  
]);

const start = () => {
	// alert(selectedRowKeys);
	// for (let index in selectedRowKeys){
	// 	// let tmp = companyInfo[index].JobTitle;
	// 	// alert(tmp)
	// }
  deleteCompanyInfo();

	setLoading(true);
	// ajax request after empty completing
	setTimeout(() => {
	  setSelectedRowKeys([]);
	  setLoading(false);
	}, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
	console.log('selectedRowKeys changed: ', newSelectedRowKeys);
	setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
	selectedRowKeys,
	onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const deleteCompanyInfo = async () =>{
    try {
        // await client.delete(`/${id}`);

        // alert(selectedRowKeys);
        let userid = localStorage.getItem("UserKey");
        console.log(userid);
        

        // const cur= companyInfo.filter(info => info.key !== );
        // console.log(cur);
        
      let cur = companyInfo;
      for (let index in selectedRowKeys){
        let id = companyInfo.filter(item => item.key === selectedRowKeys[index]).companyid;
        await client.post(`/delete_fav?CompanyId=${encodeURIComponent(id)}&UserId=${encodeURIComponent(userid)}`);
        cur = companyInfo.filter(item => item.key !== selectedRowKeys[index])
      }

      setCompnayInfo([...cur])


    } catch (error) {
        
    }

}


// const handlenewSubmit = (values)=>{
// //   submitCompanyName(values.companyname);
// //   submitZipcode(values.zipcode);
// //   submitJobTitle(values.jobtitle)
// }




return(
    // className={styles.tabpag
    <div >
    <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Delete Favorites
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table 
           bordered='true'
            rowSelection={rowSelection} columns={columns} dataSource={companyInfo} hideOnSinglePage={true} size={'small'}
            pagination = {{
              defaultCurrent: 10 ,
              total:companyInfo.length,
              style:{ textAlign:'center', marginTop: '16px',size:'5px',justifyContent:'flex-end ' },

            }}
            // className={styles.table}
            />      
      {/* <Pagination simple={true} total={10} className={styles.pagstyle} size={"small"} align={"center"}/> */}
</div>
)

}