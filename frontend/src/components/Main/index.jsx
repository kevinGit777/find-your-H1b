import React, { useState } from "react";
import axios from "axios";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
  } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined,InfoCircleOutlined } from '@ant-design/icons';
import { FavoriteTab } from "../FavoriteTable/FavoriteTable";
import { Layout,Table,Menu, Button} from 'antd';

const { Header, Content, Sider } = Layout;




const client = axios.create({
  baseURL: "http://localhost:80/"
})

const Main = () => {

	const [choice, setChoice] = useState(0);

	const [collapsed, setCollapsed] = useState(false);


	const [data, setData] = useState({
		UserId : localStorage.getItem("UserKey"),
		NewPassword: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(data.NewPassword);
			const url = `http://localhost:80/update_password?UserId=${encodeURIComponent(data.UserId)}&NewPassword=${encodeURIComponent(data.NewPassword)}`;
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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

	const handleChoice=(p)=>{
		setChoice(p.key);
	}


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












	return (
		

		<div>
			    <Layout>
					<Sider trigger={null} collapsible collapsed={collapsed}>
						<div className="logo" />
						<h1 style={{color: 'white',paddingLeft: '23px',paddingTop:'10px',fontFamily:"sans-serif",fontSize:'20px'}}> Info</h1>
						<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
						onClick={handleChoice}
						items={[
							{
								key: '1',
								icon: <InfoCircleOutlined />,
								label: 'Update Passward',
								},
							{
							key: '2',
							icon: <UserOutlined />,
							label: 'Favorite Companies',
							onTitleClick: async () =>{
								let id = localStorage.getItem("UserKey");
								alert(id)
								const res = await client.get(`/getFav?UserId=${encodeURIComponent(id)}`);
								console.log(res)
							}
							}

						]}
						/>
					</Sider>
						<Layout className="site-layout">
							<Header
							className="site-layout-background"
							style={{
								paddingLeft: '10px',
								marginTop:'-8px',
								fontSize:"18px",
								color: "white",
								
							}}
							>
							{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
								className: 'trigger',
								onClick: () => setCollapsed(!collapsed),
							})}
							<Link to="/search" style={{color:"white",paddingLeft:"1335px",fontSize:'large'}}><SearchOutlined/></Link>
							</Header>
							<Content
							className="site-layout-background"
							style={{
								margin: '24px 16px',
								padding: 24,
								minHeight: 280,
							}}
							>
							{choice == 2 ? 
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
							
							
							
							
							
							
							
							:
										<form onSubmit={handleSubmit}>
										<h1>Personal Information</h1>
										<input
											type="NewPassword"
											placeholder="NewPassword"
											name="NewPassword"
											onChange={handleChange}
											value={data.NewPassword}
										/>
										<button type="submit">
												reset password
										</button>
										<div>
										<Link to="/search">
										<button type = 'button'>
											go to search
										</button>
										</Link>
										</div>
									</form>
							}
						</Content>
					</Layout>
				</Layout>
		</div>
	);
};

export default Main;