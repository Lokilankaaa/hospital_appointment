import { Avatar, Layout, Menu, Descriptions, Table, InputNumber, Input, Popconfirm, Typography, Form } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    OrderedListOutlined,
} from '@ant-design/icons';
import { DoctorHomePageProps } from '../Models/Login';


const { Header, Content, Footer, Sider } = Layout;

interface Item {
    key: string;
    name: string;
    birthday: string;
    gender: string;
    rankk: string;
    depart: string;
    info: string;
    availableTime: string;
}

const originData = [
    {
        key: '1',
        name: '张猩您',
        birthday: '1000-6-31',
        gender: 'Female',
        rankk: '煮痔医师',
        depart: '335♂寝精神外科',
        info: '宝贝晚安 宝贝早点睡 我还要去下一场派对',
        availableTime: '2021-07-01T00:00:00',
    },
];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            editable: true,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            editable: true,
        },
        {
            title: 'Rank',
            dataIndex: 'rankk',
            editable: true,
        },
        {
            title: 'Department',
            dataIndex: 'depart',
            editable: true,
        },
        {
            title: 'Information',
            dataIndex: 'info',
            editable: true,
        },
        {
            title: 'Available Time',
            dataIndex: 'availableTime',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

class DoctorHomePage extends React.Component<DoctorHomePageProps, {}> {
    constructor(props: DoctorHomePageProps) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Sider
                    className={this.props.classes.sidebar}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to='/HomePage'>Home Page</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<OrderedListOutlined />}>
                            <Link to='/AppointmentList'>Appointment List</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>


                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <span style={{ color: '#fff', fontSize: '1.7em', marginLeft: 50 }}>预约就诊系统——医生个人主页</span>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size={128} />
                            <Descriptions title="张猩您 的个人主页"></Descriptions>
                            <EditableTable />
                            <br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <br />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default DoctorHomePage;