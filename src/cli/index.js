/*
 * Copyright 2018 Mediatech <http://newmediatech.ru/>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

const program = require('commander'),
    pkg = require('../../package.json'),
    check = require('./check');

module.exports.run = function () {

    let list = (options, fn) => {
        const config = {
            host: options.parent.host || null,
            token: options.parent.token || null
        };
        if (!fn) {
            fn = (workflows) => {
                workflows.forEach(
                    (workflow) => {
                        console.log(workflow);
                    }
                )
            }
        }
        check(['host'], options.parent, () => {
            require('./list')(
                config,
                fn
            );
        });
    };

    let download = (workflow, options) => {
        const config = {
            host: options.parent.host || null,
            token: options.parent.token || null,
            output: null,
            cwd: process.cwd()
        };
        return list(
            options,
            (workflows) => {
                return require('./filter')(
                    options,
                    require('@jetbrains/youtrack-scripting/src/cli/download'),
                    config,
                    workflow
                )(workflows);
            }
        )
    };

    let upload = (workflow, options) => {
        const config = {
            host: options.parent.host || null,
            token: options.parent.token || null,
            cwd: process.cwd()
        };
        return check(['host'], options.parent, () => {
            const {readdirSync, statSync} = require('fs');
            const {join} = require('path');
            const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
            let workflows = dirs(process.cwd()).filter((directory) => {
                return !(
                    directory === 'node_modules'
                    || directory === 'src'
                    || directory === 'src'
                    || directory === '.idea'
                    || directory === '@jetbrains'
                );
            }).concat(
                dirs(process.cwd() + "/@jetbrains").map((line) => `@jetbrains/${line}`).filter(
                    (directory) => {
                        return !(directory === '@jetbrains/youtrack-scripting-api')
                    }
                )
            );
            return require('./filter')(
                options,
                require('@jetbrains/youtrack-scripting/src/cli/upload'),
                config,
                workflow
            )(workflows);
        });
    };

    program
        .version(pkg.version)
        .option('-H, --host <host>', 'The base URL of your YouTrack installation')
        .option('-T, --token <token>', 'A permanent token that grants access to the YouTrack service. ' +
            'You can generate your own permanent tokens to authenticate with YouTrack on the ' +
            'Authentication tab of your Hub profile.');
    program
        .command('list')
        .description('View a list of installed workflows')
        .action(list);
    program
        .command("download [workflow]")
        .option('-J, --no-jetbrains', 'Don\'t download jetbrains workflows')
        .description('Download a workflow. If workflow not set download all workflows.')
        .action(download);
    program
        .command("upload [workflow]")
        .option('-J, --no-jetbrains', 'Don\'t upload jetbrains workflows')
        .description('Upload workflow to server. If workflow not set upload all workflows.')
        .action(upload);
    program.parse(process.argv);
// if program was called with no arguments, show help.
    if (program.args.length === 0) program.help();
};
