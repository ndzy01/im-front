import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import io from 'socket.io-client';
import './talk.scss';

import { createHashHistory } from 'history';
import api from '../../http';
import config from '../../config';

const history = createHashHistory();

const url =
  process.env.NODE_ENV === 'development'
    ? config.defaultUrl.imUrl
    : config.defaultUrl.imUrlOnLine;

const socket = io(url);

function dateFormat(fmt: string, date?: Date) {
  const date_ = date ? date : new Date();

  const o: any = {
    'M+': date_.getMonth() + 1, //月份
    'd+': date_.getDate(), //日
    'h+': date_.getHours(), //小时
    'm+': date_.getMinutes(), //分
    's+': date_.getSeconds(), //秒
    'q+': Math.floor((date_.getMonth() + 3) / 3), //季度
    S: date_.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date_.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}
const Talk = connect(
  (state) => state,
  {}
)((props: any) => {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState<any>([]);
  const onFinish = (values: any) => {
    const message = values.message;
    const user = props.User.user;
    api('/im/save', 'POST', { username: values.username, message });
    socket.emit('messages', { user, message });
    form.resetFields();
  };
  useEffect(() => {
    if (props.User.user && props.User.user !== '') {
      history.push('/talk');
    } else {
      history.push('/login');
    }
  }, [props.User.user]);
  useEffect(() => {
    //socket.io连接后台
    io(url).on('connect', () => {
      console.log('connect');
      socket.on('messages', (data: any) => {
        const obj = {
          user: data.user,
          message: data.message,
          time: dateFormat('yyyy-MM-dd hh:mm:ss'),
          role: data.role,
        };
        setMessages([...messages, obj]);
        console.log(messages);
      });
    });
    return () => {
      //断开socket io连接
      io(url).on('disconnect', function () {
        console.log('disconntect');
      });
    };
  }, [messages]);
  return (
    <div className="talk">
      <div className="talk-show">
        {messages.map((message: any, index: any) => {
          let cn;
          if (index === 0) {
            cn = 'talk-show-titleInfo';
          } else {
            cn = 'talk-show-info';
          }
          return (
            <div className={cn} key={index}>
              <div className="talk-show-message">
                <span
                  className={
                    message.role === '0'
                      ? 'talk-show-message-user-yes'
                      : 'talk-show-message-user-no'
                  }
                >
                  {message.user}:
                </span>
                <span>{message.message}</span>
              </div>

              <span>{message.time}</span>
            </div>
          );
        })}
      </div>
      <div className="talk-content">
        <Form name="talk_from" form={form} onFinish={onFinish}>
          <Row>
            <Col span={22}>
              <Form.Item
                name="message"
                rules={[{ required: true, message: '还没有输入任何内容！' }]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: '90%' }}
                >
                  Send
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
});

export default Talk;
