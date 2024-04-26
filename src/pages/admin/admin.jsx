import { Admin, Resource } from "react-admin";
import { FirebaseDataProvider, FirebaseAuthProvider } from "react-admin-firebase";
import { firebaseConfig } from "../../config/firebase-config";
import SignInSide from "../SignInSide";
import { UserEdit, UserList, UserShow } from "./users";
import { WorkshopCreate, WorkshopEdit, WorkshopList, WorkshopShow } from "./workshops";
import UserIcon from '@mui/icons-material/People';
import { Home } from "../home";

export const AppAdmin = () => {
    const options = {
        logging: true,
    }
    const dataProvider = FirebaseDataProvider(firebaseConfig, options);
    const authProvider = FirebaseAuthProvider(firebaseConfig, options);

    return (
        <Admin basename="/admin" ready={Home}
            loginPage={SignInSide}
            dataProvider={dataProvider}
            authProvider={authProvider}
        >
            <Resource
                name="users"
                icon={UserIcon}
                list={UserList}
                show={UserShow}
                edit={UserEdit}
            />
            <Resource
                name="workshops"
                list={WorkshopList}
                show={WorkshopShow}
                create={WorkshopCreate}
                edit={WorkshopEdit}
            />
        </Admin>
    );
}