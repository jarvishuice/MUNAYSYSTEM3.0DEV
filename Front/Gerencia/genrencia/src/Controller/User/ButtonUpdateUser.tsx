import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { UsersEntity } from "../../core/Entities/users/userEntity";
import { UserDAO } from "../../core/Implements/user/userDAO";

async function updateUser(user: UsersEntity) {

    if (user as  UsersEntity) {
        console.log(" si paso la entidad")
         console.warn("esta es la entiddad ->"+user)

    } else {
        console.log("false")
    }




    try {
        const ControladorUsers = new UserDAO();
        const data = await ControladorUsers.updateUser(user);
        
        return data as boolean;

    } catch (error) {
        console.error(error);
        return null

    }

}

export   function ButtonUpdateUser(props: any) {

    return (<IconButton
        color="primary"
        onClick={() => { updateUser(props.user); props.reload(2); }}
    >
        <SaveIcon />
    </IconButton>)

}