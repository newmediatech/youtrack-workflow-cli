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

const resolve = require('@jetbrains/youtrack-scripting/lib/net/resolve');
const exit = require('@jetbrains/youtrack-scripting/lib/cli/exit');
const request = require('@jetbrains/youtrack-scripting/lib/net/request');
const queryfields = require('@jetbrains/youtrack-scripting/lib/net/queryfields');
const HttpMessage = require('@jetbrains/youtrack-scripting/lib/net/httpmessage');

module.exports = function (config, fn) {
    let message = new HttpMessage(resolve(config.host, '/api/admin/workflows'));
    message = config.token ? HttpMessage.sign(message, config.token) : message;
    message.query = message.query || {};
    message.query.fields = queryfields(['converted', 'id', 'name']);
    message.query.$top = -1;

    request(message, (error, data) => {
        if (error) return exit(error);
        let name = [];
        data.filter(
            (x) => {
                return x.converted;
            }
        ).forEach((x) => {
            name.push(x.name);
        });
        return fn && fn(name);
    });
};
