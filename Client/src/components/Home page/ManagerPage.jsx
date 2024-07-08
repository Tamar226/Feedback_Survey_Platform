import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { getAllUsers } from '../../Requests';
import { updateUserRole } from '../../Requests';

export default function RowEditingDemo() {
    const [users, setUsers] = useState(null);
    const [roles] = useState(['user', 'manager', 'reviewer']);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                const updatedUsers = usersData.data.map(user => ({
                    ...user,
                    key: user.username,
                }));
                setUsers(updatedUsers);
            } catch (err) {
                console.error("Error in getAllUsers: ", err);
            }
        };

        fetchUsers();
    }, []);

    const getSeverity = (value) => {
        switch (value) {
            case 'user':
                return 'danger';

            case 'manager':
                return 'warning';

            case 'reviewer':
                return 'success';

            default:
                return null;
        }
    };

    const onRowEditComplete = async (e) => {
        let _users = [...users];
        let { newData, index } = e;

        _users[index] = newData;

        setUsers(_users);

        try {
            const response = await updateUserRole(newData.username, newData.roleName);
            let updatedUser = response.data; // Assuming the updated user data is in response.data
            updatedUser.key = updatedUser.username;

            _users[index] = updatedUser;
            setUsers(_users);
        } catch (error) {
            console.error("Error in updating user: ", error);
        }
    };

    // const textEditor = (options) => {
    //     return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    // };

    const roleEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={roles}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a Role"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getSeverity(option)}>{option}</Tag>;
                }}
            />
        );
    };
    const rolesBodyTemplate = (rowData) => {
        console.log(rowData);
        return <Tag value={rowData.roleName} severity={getSeverity(rowData.roleName)}></Tag>;
    };

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div className="card p-fluid">
            <DataTable value={users} editMode="row" dataKey="username" onRowEditComplete={onRowEditComplete} tableStyle={{ width: '100%' }}>
                <Column field="username" header="Username" style={{ width: '30%' }}></Column>
                <Column field="roleName" header="Role" body={rolesBodyTemplate} editor={(options) => roleEditor(options)} style={{ width: '50%' }}></Column>
                <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}
