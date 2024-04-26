import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    Filter,
    SimpleShowLayout,
    SimpleForm,
    ReferenceField,
    ReferenceInput,
    TextField,
    TextInput,
    ShowButton,
    EditButton,
    DeleteButton,
    RichTextField,
    SelectInput,
} from "react-admin";

const WorkshopFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const WorkshopList = (props) => (
    <List {...props} filters={<WorkshopFilter />}>
        <Datagrid>
            <TextField source="title" />
            <TextField source="category" />
            <TextField source="description" />
            <TextField source="facilitator" />
            <ShowButton label="" />
            <EditButton label="" />
            <DeleteButton label="" redirect={false} />
        </Datagrid>
    </List>
);

export const WorkshopShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="category" />
            <TextField source="description" />
            <TextField source="facilitator" />
        </SimpleShowLayout>
    </Show>
);

export const WorkshopCreate = (props) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="category" />
            <TextInput source="description" />
            <TextInput source="facilitator" />
        </SimpleForm>
    </Create>
);

export const WorkshopEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="category" />
            <TextInput source="description" />
            <TextInput source="facilitator" />
        </SimpleForm>
    </Edit>
);