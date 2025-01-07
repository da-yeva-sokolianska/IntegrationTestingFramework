import * as https from "node:https";
import axios from 'axios';

export default class UserUtils {


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

    async getCrumb(jenkinsUrl, jenkinsLogin, jenkinsPassword) {
        const crumbUrl = `${jenkinsUrl}/crumbIssuer/api/json`;
        const response = await axios.get(crumbUrl, {
            auth: {
                username: jenkinsLogin,
                password: jenkinsPassword
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        console.log(response.data);
        return response.data;
    }

    async enroll(username, env, deleteUser = true) {
        const axios = require('axios');
        const FormData = require('form-data');
        const fs = require('fs');
        const data = new FormData();

        const jenkinsUrl = 'https://awecorpjen001.onetech.local';
        const jobUrl = jenkinsUrl + '/job/Enroll_Products/build';
        const jenkinsLogin = 'svc-jenkinsblds';
        const jenkinsPassword = 'Pom1dor4ik'
        const crumb = await this.getCrumb(jenkinsUrl, jenkinsLogin, jenkinsPassword);


        const params = {"parameter": [
                {
                    "name": "Environment",
                    "value": env
                },
                {
                    "name": "EnrollmentPath",
                    "value": "us/6019/403y3xu/DNBX/254/f/cs_4p_a254.aspx"
                },
                {
                    "name": "Product",
                    "value": "Default"
                },
                {
                    "name": "EnrollmentUser",
                    "value": username
                },
                {
                    "name": "Browser",
                    "value": "Chrome"
                },
                {
                    "name": "Delete user",
                    "value": deleteUser
                },
                {
                    "name": "Activate Filters",
                    "value": false
                },
                {
                    "name": "Record_video",
                    "value": false
                },
                {
                    "name": "Upstream_Build_name",
                    "value": "None"
                }
            ]}

        data.append('json', JSON.stringify(params));

        const config = {
            method: 'post',
            url: jobUrl,
            headers: {
                Authorization: `Basic ${Buffer.from(`${jenkinsLogin}:${jenkinsPassword}`).toString('base64')}`,
                [crumb.crumbRequestField]: crumb.crumb,
                // 'Jenkins-Crumb': crumb.crumb,
                // 'Jenkins-Crumb': 'a5624b74260becfa4fc5cac758237569ec7d10625f590959a351edf1580dd516',
                ...data.getHeaders()
            },
            data: data,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        };

        await axios(config)
            .then((response) => {
                console.log('Response data:', JSON.stringify(response.data));
                return response.data.status;
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}