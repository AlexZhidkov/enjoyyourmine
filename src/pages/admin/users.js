import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Edit,
    Filter,
    SimpleShowLayout,
    SimpleForm,
    ReferenceInput,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DeleteButton
} from "react-admin";

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="displayName" alwaysOn />
    </Filter>
);

export const UserList = (props) => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid>
            <TextField source="displayName" />
            <TextField source="email" />
            <ShowButton label="" />
            <EditButton label="" />
            <DeleteButton label="" redirect={false} />
        </Datagrid>
    </List>
);

export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="displayName" />
            <TextField source="email" />
        </SimpleShowLayout>
    </Show>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="displayName" options={{ disabled: true }} />
            <ReferenceInput source="email" options={{ disabled: true }} />
        </SimpleForm>
    </Edit>
);