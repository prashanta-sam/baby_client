import React, { useEffect } from 'react'
import { Avatar, Card, Col, Row, Skeleton, Switch } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassList } from '../../Slices/product/ClassListSlice';
const { Meta } = Card;


const ClassList = () => {
    const [loading, setLoading] = useState(true);
  
    const dispatch=useDispatch()
    const {status,items}=useSelector((state)=> state.classList)
    const [newItem,setNewItem]=useState([])

    const onChange = (checked) => {
      setLoading(!checked);
    };

  
    useEffect(()=>{
      dispatch(fetchClassList(10))
      let arr = [...items].filter((d,idx) => idx < 10)
      setNewItem(arr)
      setTimeout(() => {
        setLoading(false);      
    
      }, 2000);

    },[items])
    const style = {
      background: '#0092ff',
      padding: '8px 0',
    };
    const product= <div>
                      <Row gutter={[16, 16]}>
                          {
                            newItem.map((row,i)=>{
                              return   <>
                                
                                <Col className="gutter-row" span={6}>

                                  <Skeleton loading={loading} avatar active>
                                    <Card
                                            style={{
                                              width: 300,
                                              marginTop: 16,
                                            }}
                                            loading={loading}
                                          >
                                            <Meta
                                              avatar={<Avatar src={row.url} />}
                                              title={row.title}
                                              description={row.body}
                                            />
                                              
                                      </Card>
                                      <div style={style}>Book Class</div>
                                      </Skeleton>
                                  
                                </Col>
                          
                              
                              </> 
                            })
                          }
                      </Row>                  
                   </div>
    
  return (
        <div>
          {product}
            
       </div>
  )
}


export default ClassList