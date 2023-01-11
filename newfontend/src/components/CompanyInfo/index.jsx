import React,{useState} from 'react';
import axios from 'axios';
import {Form} from "../Forms/Form";
import {Tag} from '../Tags/Tag';
import { Layout} from 'antd';
import { CompanyInfoTable } from '../CompanyInfoTable';

const { Header, Footer, Content } = Layout;


const client = axios.create({
    baseURL: "http://localhost:80/"
})


const CompanyInfo = () =>{
    const [companyInfo, setCompnayInfo] = useState([
        {
        CompanyName:"CNA",
        CompanyId:1,
        State:"Illinois",
        City:"Champaign",
        Street:"708 Sth northe adafahdfuiosdhafiu",
        Zipcode:61820,
        JobTitle:"SDE"
    }
]);
    const [zipCompany, setZipCompany] = useState([
        {
            CompanyName:"CNA",
            Zipcode:61820
        }
    ])



    const [jobCompany, setjobCompany] = useState([
        {        
            CompanyId: 1,
            CompanyName:"CNA",
            h1b_counts:10
        }
    ])

const [error, setError] = React.useState(null);

const companyInfoPlaceholder="Please input your company name";
const zipCodePlaceholder="Please input your zipcode";
const jobTitlePlaceholder="Please input your job title";


if (error) return `Error: ${error.message}`;

    const handleSubmit = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			const res = await client.get("/test.json");
            // const res = await client.get(`/search?${formdata}`);
            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];
            if (temp.length >5){
                for (var i  = 0; i < 5; i++){
                    tmp.push(temp[i]);
                }
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
	};

    const SubmitZipcode = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			const res = await client.get("/test1.json");
            // const res = await client.get(`/${formdata}`);
            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];
            if (temp.length >5){
                for (var i  = 0; i < 5; i++){
                    tmp.push(temp[i]);
                }
            }
            setZipCompany(tmp);


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    const SubmitJobTitle = async (formdata) => {
		try {
            // alert(formdata)
            // alert(`/${formdata}`);

			const res = await client.get("/test2.json");
            // const res = await client.get(`/${formdata}`);
            const temp = [];
            for (const [k,v] of Object.entries(res.data)){
                temp.push(v);
            }
            const tmp=[];
            if (temp.length >5){
                for (var i  = 0; i < 5; i++){
                    tmp.push(temp[i]);
                }
            }
            setjobCompany(tmp);


		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


    const deleteCompanyInfo = async (id) =>{
        try {
            // await client.delete(`/${id}`);
            const cur= companyInfo.filter(info => info.companyId !== id);
            setCompnayInfo(cur);
        } catch (error) {
            
        }

    }




    return(
          <>
            <Layout>
                <Header className='space-align-block'>Search Supported Companies!</Header>
                <Content className='space-align-block'><Form handleSubmit={handleSubmit} placeholder={companyInfoPlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={companyInfo} deleteCompanyInfo={deleteCompanyInfo}/>
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>
                <Content className='space-align-block'><Form handleSubmit={SubmitZipcode} placeholder={zipCodePlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={zipCompany} />
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>
                <Content className='space-align-block'><Form handleSubmit={SubmitJobTitle} placeholder={jobTitlePlaceholder}/></Content>
                <Footer className='space-align-block'>
                    <Tag Info={jobCompany} />
                    {/* <CompanyInfoTable companyInfo={companyInfo}/> */}
                </Footer>

            </Layout>
          </>
    )

}

export default CompanyInfo;