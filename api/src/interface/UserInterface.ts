export interface UserInterface {
    username: string,
    email: string,
    password: string,
    emailToken: string,
    isVerify: boolean,
    accountBalance: number,
    listOfAddress: Array<string>,
    phoneNum: string,
    firstName: string,
    lastName: string
}