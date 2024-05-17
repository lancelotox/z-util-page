/**
 * @jest-environment jsdom
 */

import { Http } from "../src/index";
import mock from "xhr-mock";

describe('Http请求', ()=>{

    beforeEach(()=>{mock.setup()})

    afterEach(()=>{mock.teardown()})

    let http = new Http({
        responseType: 'text'
    });

    test('Get', ()=>{
        let result = '';
        mock.get('/restore', {
            body: 'Hello World!'
        });
        return new Promise<void>((resolve)=>{
            http.ajax({
                url: '/restore'
            }).then((res)=>{
                result = res.data;
                resolve();
            });
        }).then(()=>{
            expect(result).toBe('Hello World!');
        });
    })
})
