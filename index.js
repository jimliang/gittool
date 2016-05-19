/**
 * Created by jimliang on 2016/4/28 0028.
 */
"use strict";
const ChildProcess = require('child_process')
const Path = require('path')


const gitENOENT = /fatal: (Path '([^']+)' does not exist in '([0-9a-f]{40})'|ambiguous argument '([^']+)': unknown revision or path not in the working tree.)/;


function gitExec(commands, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
        let child = ChildProcess.spawn("git", commands);
        let stdout = [], stderr = [];
        let exitCode;
        child.stdout.addListener('data', (text) => stdout.push(text));
        child.stderr.addListener('data', (text) => stderr.push(text));
        child.addListener('exit', (code) => exitCode = code);
        child.addListener('close', () => {
            if (exitCode > 0) {
                var err = new Error("git " + commands.join(" ") + "\n" + Buffer.concat(stderr).toString(encoding));
                if (gitENOENT.test(err.message)) {
                    err.errno = process.ENOENT;
                }
                return reject(err);
            }
            resolve(Buffer.concat(stdout).toString(encoding));
        });
        child.stdin.end();
    })
}

function _unique(list) {
    var result = [];
    for (let j of list) {
        if (j && !result.includes(j)) {
            result.push(j)
        }
    }
    return result;
}

module.exports = class Git {

    constructor(repo) {
        //this.repo = repo;
        this.gitCommands = [
            '--git-dir=' + Path.join(repo, '.git'),
            '--work-tree=' + repo
        ]
    }
    
    /**
     * 列出提交里所修改的文件
     * @param commits
     * @returns {Promise}
     */
    listChangeFiles(commits) {
        if (!Array.isArray(commits)) {
            commits = [commits];
        }
        return gitExec(this.gitCommands.concat(['show', ...commits, '--name-only', '--pretty=format:'
        ])).then(str => _unique(str.split(/\s+/)))
    }

}