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

const check = require('./check');

module.exports = function getFilter(options, fn, config, workflow) {
    return (workflows) => {
        let down = (wrkfl) => {
            check(
                ['host'],
                options.parent,
                () => {
                    fn(
                        config,
                        wrkfl
                    )
                }
            );
        };
        if (workflow) {
            workflows = workflows.filter(
                (wrkfl) => {
                    return wrkfl === workflow;
                }
            )
        } else {
            if (!options.jetbrains) {
                workflows = workflows.filter(
                    (wrkfl) => {
                        return !wrkfl.startsWith('@jetbrains/');
                    }
                );
            }
        }
        return workflows.forEach(
            (wrkfl) => {
                down(wrkfl);
            }
        );
    };
};
