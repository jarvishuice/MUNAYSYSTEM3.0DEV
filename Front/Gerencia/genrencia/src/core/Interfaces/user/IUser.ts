
import { UsersEntity } from "../../Entities/users/userEntity";


export abstract class IUser {

    abstract getAllUsers(nombre: string | any): Promise<UsersEntity[]|[]|null>;
    abstract createuser(User: UsersEntity): Promise<UsersEntity | null>
    abstract updateUser(User: UsersEntity): Promise<UsersEntity[]>
}
