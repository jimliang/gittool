/**
 * Created by jimliang on 2016/5/20 0020.
 */

"use strict";
const assert = require('assert')
const Git = require('../index')

describe('git tool', ()=> {
    let git;
    before(()=> {
        git = new Git('D:\\Program Files\\VertrigoServ\\www\\kact\\');
    })
    describe('list change file', ()=> {
        it('one file equal', done=> {
            test('deepEqual', git.listChangeFiles('463a284'), ['js/xshow/template/tailPanels.min.js'], done);
        });

        it('multi files equal', done=> {
            test('deepEqual', git.listChangeFiles(['d7ff677', '463a284']), ['js/xshow/template/rightPanels.min.js', 'js/xshow/template/tailPanels.min.js'], done);
        })
    })
});


function test(method, promise, expect, done) {
    promise.then(data=> {
        try {
            assert[method].call(assert, data, expect)
            done()
        } catch (e) {
            done(e)
        }
    }).catch(done)
}