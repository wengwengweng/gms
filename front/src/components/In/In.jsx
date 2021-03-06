import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Breadcrumb, Row, Col , Card, Form, Icon, Input, Button, Checkbox,Table } from 'antd';
import classNames from 'classnames';
import '../public.css';
import Search from '../SearchTutorin.jsx';
const InputGroup = Input.Group;

const FormItem = Form.Item;

class TutorIn extends Component {
    
    constructor(props) {
          super(props);
          this.state = {
            list: [],
          };
        }

    loadAccounts() {
      var self = this;
            fetch('http://localhost:3000/tutorsin',{
                method: 'GET',
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
              })
            .then(function(res){return res.json()})
            .then(function(data){
              self.setState({
                list:data.tutorin
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
              dataIndex: 'tutorin_id',
              render: text => <Link to={'/manage/studentlist/tutorin/'+text}>{text}</Link>,
            }, {
              title: '姓名',
              dataIndex: 'tutorin_name',
            }, {
              title: '性别',
              dataIndex: 'tutorin_sex',
            }, {
              title: '系别',
              dataIndex: 'tutorin_system',
            }, {
              title: '职称',
              dataIndex: 'tutorin_title',
            }, {
              title: '职务',
              dataIndex: 'tutorin_post',
            }];

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
                          <Breadcrumb.Item><Link to="/manage/tutorin">校内导师</Link></Breadcrumb.Item>
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

export default TutorIn;