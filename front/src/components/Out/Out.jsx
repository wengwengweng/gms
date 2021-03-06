import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import classNames from 'classnames';
import '../public.css';
import Search from '../SearchTutorout.jsx';

const InputGroup = Input.Group;

const FormItem = Form.Item;

class TutorOut extends Component {

  constructor(props) {
      super(props);
      this.state = {
        list: [],
      };
    }

    loadAccounts() {
      var self = this;
            fetch('http://localhost:3000/tutorsout',{
                method: 'GET',
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
              })
            .then(function(res){return res.json()})
            .then(function(data){
              self.setState({
                list:data.tutorout
              })
            });
    }

    componentDidMount() {
      this.loadAccounts();
    }
    
    onFind(result){
      this.setState({list:result});
    }

     render() {
            const self = this
            const { list } = self.state;

            const columns = [{
              title: '导师编号',
              dataIndex: 'tutorout_id',
              render: text => <Link to={'/manage/studentlist/tutorout/'+text}>{text}</Link>,
            }, {
              title: '姓名',
              dataIndex: 'tutorout_name',
            }, {
              title: '性别',
              dataIndex: 'tutorout_sex',
            }, {
              title: '系别',
              dataIndex: 'tutorout_system',
            }, {
              title: '职称',
              dataIndex: 'tutorout_title',
            }, {
              title: '职务',
              dataIndex: 'tutorout_post',
            }];
            // const data = [{
            //   key: '1',
            //   name: 'John Brown',
            //   age: 32,
            //   address: 'New York No. 1 Lake Park',
            // }, {
            //   key: '2',
            //   name: 'Jim Green',
            //   age: 42,
            //   address: 'London No. 1 Lake Park',
            // }, {
            //   key: '3',
            //   name: 'Joe Black',
            //   age: 32,
            //   address: 'Sidney No. 1 Lake Park',
            // }];

            // rowSelection object indicates the need for row selection
            const rowSelection = {
              getCheckboxProps: record => ({
                disabled: record.name === 'Jim Green',    // Column configuration not to be checked
              }),
            };
   


      return (
                <div>
                    <Row  className="mt20">
                      <Col>
                        <Breadcrumb>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                          <Breadcrumb.Item><Link to="/manage/tutorout">校外导师</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="mt20">
                            <Search onFind={this.onFind.bind(this)}/>
                          </div>
                          <div className="mt20"  style={{background:"#fff",padding:"20px",boxShadow:"2px 2px 2px #e9e9e9"}}>
                             <Table rowSelection={null} loading={false} columns={columns} dataSource={list}  />
                         </div>
                      </Col>
                    </Row>
                </div>
              );
           }
        }

export default TutorOut;