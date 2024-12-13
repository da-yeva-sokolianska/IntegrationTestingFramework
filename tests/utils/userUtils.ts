export class UserUtils {


    getLogin() {
        const defaultLogin = 'anneabtestcsid@dataart.com';
        let user = process.env.login ? process.env.login : defaultLogin;
        console.log(`Current userName: ${user}`);
        return user;
    }

    getPassword() {
        const defaultPassword = 'password1'
        let password = process.env.password ? process.env.password : defaultPassword;
        console.log(`Current password: ${password}`);
        return password;
    }
}