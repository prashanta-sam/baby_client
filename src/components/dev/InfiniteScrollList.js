import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import ScrollList from './ScrollList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassList } from '../../Slices/product/ClassListSlice';
import { Avatar, Card, Col, Row, Skeleton, Switch } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const InfiniteScrollList = () => {


  const [currPage, setCurrPage] = useState(1); 
  const [prevPage, setPrevPage] = useState(0); 
  const [userList, setUserList] = useState([]); 
  const [wasLastList, setWasLastList] = useState(false); 
  const [isFetching,setFetching]=useState(false)

 

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true)
      console.log("currPage ",currPage)
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${currPage}&_limit=10`
      );
      if (!response.data.length) {
        setWasLastList(true);
        return;
      }
    
      setFetching(false)
      setPrevPage(currPage);
      setUserList([...userList, ...response.data]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, userList]);

//   const {currPage,prevPage,items,wasLastList,isFetching}=useSelector((state)=> state.classList)
//   const dispatch=useDispatch()
// const [cPage,setPage]=useState()
//   useEffect(() => {

//     const fetchData = async (cpage) => {
//       dispatch(fetchClassList(cpage))
//     }

//     if (!wasLastList && prevPage !== cPage) 
//     {
//       fetchData()   
//     }
//   }, [cPage, wasLastList, prevPage, items]);

  const style={
    height: '62px',
    border: '1px solid',
    textAlign: 'center',
  }

  const component=
  <Row gutter={8}>
      {
        userList.map((row,i)=>{
          return   <>
            
            <Col  span={6} key={i}>

              {/* <Skeleton loading={loading} avatar active> */}
                <Card
                        // style={{
                        //   width: 300,
                        //   marginTop: 16,
                        // }}
                        // loading={loading}
                      >
                        <Meta
                          avatar={<Avatar src={row.url} />}
                          title={row.id}
                          // description={row.body}
                        />
                          
                  </Card>
                  <div style={style}>Book Class</div>
                  {/* </Skeleton> */}
              
            </Col>
      
          
          </> 
        })
      }
  </Row>                  


  return (
   <>
   
            <ScrollList
               callback={()=> setCurrPage(currPage+1)}                   
               component={component}   
               isFetching={isFetching}            
            />
        
  </>
 
  );
};

export default InfiniteScrollList;