export interface Roles {
    reader? : Boolean;
    admin? : Boolean;
    superAdmin? : Boolean;
};

export class User{
    uid : string;
    email : string;
    roles : Roles;

    constructor(authData) {
        this.uid = authData.uid
        this.email = authData.email
        this.roles = {
            reader : true
        }
    }
};