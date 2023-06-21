import 'dotenv/config';
import actions from '@actions/core';
import Reddit from 'reddit';

async function main() {
    const appId = actions.getInput('appId');
    const username = actions.getInput('username');
    const password = actions.getInput('password');
    const appSecret = actions.getInput('appSecret');
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
            sr: 'u/Remmintan',
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