import 'dotenv/config';
import * as actions from '@actions/core';
import Reddit from 'reddit';

async function main() {
    const appId = actions.getInput('app-id', {required: true});
    const appSecret = actions.getInput('app-secret', {required: true});
    const username = actions.getInput('username', {required: true});
    const password = actions.getInput('password', {required: true});
    
    const reddit = new Reddit({
        username,
        password,
        appId,
        appSecret,
        userAgent: `personal-script:${appId}:1.0 (by /u/remmintan)`,
    });


    actions.info('Posting to Reddit...');
    await reddit.post(
        '/api/submit',
        {
            sr: 'u_Remmintan',
            kind: 'self',
            title: 'Hello World',
            text: 'This is a test post',
        }
    )
    actions.info('Done!');
}

main().catch((err) => {
    console.log(err);
    actions.setFailed(err);
});