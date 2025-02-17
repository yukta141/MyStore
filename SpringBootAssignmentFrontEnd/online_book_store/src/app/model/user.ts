export class User {
  userId?: number | undefined;
  userName: string;
  userEmail: string;
  userContactNumber: string;
  userPassword: string;
  userAddress: string;
  userRole:string;
  blocked?: boolean

  constructor(
    userName: string,
    userEmail: string,
    userContactNumber: string,
    userPassword: string,
    userAddress: string,
    userRole:string
  ) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userContactNumber = userContactNumber;
    this.userPassword = userPassword;
    this.userAddress = userAddress;
    this.userRole=userRole;
    this.blocked=false;
  }
}
