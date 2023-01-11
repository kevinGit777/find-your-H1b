import React,{useState} from 'react';
import axios from 'axios';
// import {Form1} from "../Forms/Form";
// import {Tag} from '../Tags/Tag';
import styles from './index.module.css' 
import { Link, useNavigate } from "react-router-dom";


import { SearchOutlined,UserOutlined } from '@ant-design/icons';

import { Layout, Button, Form, Input,Table} from 'antd';
const { Header, Content, Footer } = Layout;


const client = axios.create({
    baseURL: "http://localhost:80/"
})

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



const CompanyInfo = () =>{

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  
    const [companyInfo, setCompnayInfo] = useState([
        {
          key:1,
        companyname:"CNA",
        companyid:0,
        state:"Illinois",
        city:"Champaign",
        street:"708 Sth northe adafahdfuiosdhafiu",
        zipcode:61820,
        JobTitle:"SDE"
    },
    {
      key:2,
      companyname:"CNA",
      companyid:1,
      state:"Illinois",
      city:"Champaign",
      street:"708 Sth northe adafahdfuiosdhafiu",
      zipcode:61820,
      JobTitle:"SDE"
    },
    {
      key:3,
      companyname:"CNA",
      companyid:2,
      state:"Illinois",
      city:"Champaign",
      street:"708 Sth northe adafahdfuiosdhafiu",
      zipcode:61820,
      JobTitle:"SDE"
  },
  {
    key:4,
    companyname:"CNA",
    companyid:3,
    state:"Illinois",
    city:"Champaign",
    street:"708 Sth northe adafahdfuiosdhafiu",
    zipcode:61820,
    JobTitle:"SDE"
  }   
]);
    // const [zipCompany, setZipCompany] = useState([
    //     {
    //         companyname:"CNA",
    //         zipcode:61820
    //     }
    // ])



    // const [jobCompany, setjobCompany] = useState([
    //     {        
    //         companyId: 1,
    //         companyname:"CNA",
    //         h1b_counts:10
    //     }
    // ])

const [error, setError] = React.useState(null);

const companyInfoPlaceholder="Please input your company name";
const zipCodePlaceholder="Please input your zipcode";
const jobTitlePlaceholder="Please input your job title";


if (error) return `Error: ${error.message}`;

  //   const submitCompanyName = async (formdata) => {
	// 	try {

  //           // alert(formdata)
  //           // alert(`/${formdata}`);

	// 		      // const res = await client.get("/test.json");
  //           // const res = await client.get(`/search?${formdata}`);
  //           const res = await client.get(`/search_company?CompanyName=${encodeURIComponent(formdata)}`);
  //           console.log(res.data);
  //           const temp = [];
  //           for (const [k,v] of Object.entries(res.data)){
  //               temp.push(v);
  //           }
  //           const tmp=[];

  //           for (let index = 0; index < Math.min(temp.length, 5); index++) {
  //               tmp.push(temp[index]);                
  //           }

  //           setCompnayInfo(tmp);
  //           // setCompnayInfo(res.data);

	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };

  //   const submitZipcode = async (formdata) => {
	// 	try {
  //           // alert(formdata)
  //           // alert(`/${formdata}`);
	// 		// const res = await client.get("/test1.json");
  //           const res = await client.get(`/search_zipcode?zipcode=${encodeURIComponent(formdata)}`);

  //           const temp = [];
  //           for (const [k,v] of Object.entries(res.data)){
  //               temp.push(v);
  //           }
  //           const tmp=[];

  //           for (let index = 0; index < Math.min(temp.length, 5); index++) {
  //               tmp.push(temp[index]);
                
  //           }            

  //           setZipCompany(tmp);

	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };

  //   const submitJobTitle = async (formdata) => {
	// 	try {
  //           // alert(formdata)
  //           // alert(`/${formdata}`);

	// 		// const res = await client.get("/test2.json");
  //           const res = await client.get(`/search_keyword?jobtitle=${encodeURIComponent(formdata)}`);

  //           const temp = [];
  //           for (const [k,v] of Object.entries(res.data)){
  //               temp.push(v);
  //           }
  //           const tmp=[];

  //           for (let index = 0; index < Math.min(temp.length, 5); index++) {
  //               tmp.push(temp[index]);
  //           }                  
  //           setjobCompany(tmp);

	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };






    
      const start = () => {

        addFavorite();


        setLoading(true);
        // // ajax request after empty completing
        setTimeout(() => {
          // setSelectedRowKeys([]);
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


      const addFavorite = async ()=>{
        alert(selectedRowKeys);
        let userid = localStorage.getItem("UserKey");
        let id = companyInfo;
        console.log(id);
        for (let index in selectedRowKeys){
           id = companyInfo.filter(item => item.key !== selectedRowKeys[index])
        }
        for ( let index in id ){
          let  idx = id[index].companyid
          await client.post(`/insertFav?CompanyId=${encodeURIComponent(idx)}&UserId=${encodeURIComponent(userid)}`);

        }
        // for (int  )

        // alert(a)
      }

    const handlenewSubmit = async (values)=>{
      try {
        const CompanyName = values.companyname;
        const zipcode = values.zipcode ;
        const jobtitle =  values.jobtitle ;
        // const zipcode = values.zipcode == undefined ? -9999: values.zipcode;
        // const jobtitle =  values.jobtitle == undefined ? -9999: values.jobtitle;
      //  alert(CompanyName)
      //   alert(zipcode)
      //   alert(jobtitle)

        const res = await client.get(`/search?CompanyName=${encodeURIComponent(CompanyName)}&zipcode=${encodeURIComponent(zipcode)}&jobtitle=${encodeURIComponent(jobtitle)}`);
        console.log(res.data);
        console.log(localStorage.getItem("UserKey"))
        const temp = [];
        let i = 1;
        for (const [k,v] of Object.entries(res.data)){
            v['key'] = i;
            i +=1;
            temp.push(v);
        }
        const tmp=[];
  
        for (let index = 0; index < Math.min(temp.length, 5); index++) {
            tmp.push(temp[index]);                
        }
  
        setCompnayInfo(tmp);
        
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }


      // submitCompanyName(values.companyname);
      // submitZipcode(values.zipcode);
      // submitJobTitle(values.jobtitle)
    }

    return(
      

      // <div className={styles.body}>
        <Layout className={styles.layout} customLayout>
          <Header className={styles.header}>
            {/* <div className={styles.logo} /> */}
            <p className={styles.title}>H1B Search</p>
            <Link to="/main">
            <p className={styles.personal}><UserOutlined /></p>
				    </Link>
          </Header>
          <Content className={styles.content}>
            <div className={styles.searchbutton}>
            <Form  layout='vertical' onFinish={handlenewSubmit} className={styles.form}>
              <Form.Item label="Company Name:" name="companyname" 
              // tooltip="This is a required field" 
               className={styles.formitem}>
                <Input placeholder={companyInfoPlaceholder}  className={styles.inputstyle} style={{ width: 250 }} />
              </Form.Item>
              <Form.Item
                label="Zip Code:"
                name="zipcode"
                // tooltip={{
                //   title: "This is an optional field",
                //   icon: <InfoCircleOutlined />
                // }}
                className={styles.formitem}
              >
                <Input placeholder={zipCodePlaceholder} className={styles.inputstyle}   style={{ width: 250 }}/>
              </Form.Item>
              <Form.Item
                label="Job Title:"
                name="jobtitle"
                // tooltip={{
                //   title: "This is an optional field",
                //   icon: <InfoCircleOutlined />
                // }}
                className={styles.formitem}
              >
                <Input placeholder={jobTitlePlaceholder} className={styles.inputstyle} style={{ width: 250 }} />
              </Form.Item>
              <Form.Item className={styles.formbutton}>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  Search
                </Button>
              </Form.Item>
            </Form>        
            {/* <Form1 handleSubmit={handleSubmit} placeholder={companyInfoPlaceholder} className={styles.companysearch}/> */}
            </div>
                <div className={styles.tabpag}>
                <div
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                      Add Favorites
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
                        className={styles.table}
                        />      
                  {/* <Pagination simple={true} total={10} className={styles.pagstyle} size={"small"} align={"center"}/> */}
            </div>
          </Content>
          <Footer className={styles.footer}>
              Created by SpongeBob Team
          </Footer>
        </Layout>
      // </div>

    )

}

export default CompanyInfo;