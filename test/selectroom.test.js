
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.$= require('jquery');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
global.document = new JSDOM('<!doctype html><html><body></body></html>').window.document;
const $ = jquery(global.window);
const { addRoom } = require("../public/selectroom"); 


describe('addRoom', () => {
    it('should add a new room row to the table', () => {
        const dom = new JSDOM(`
            <html>
                <body>
                    <table id="table"></table>
                    <button onclick="addRoom()"></button>
                </body>
            </html>
        `);
        global.document = dom.window.document;

        addRoom();
        const table = document.getElementById('table');
        expect(table.children.length).toBe(1);
    });

    it('should disable the add button when 10 rooms have been added', () => {
        const dom = new JSDOM(`
            <html>
                <body>
                    <table id="table"></table>
                    <button onclick="addRoom()"></button>
                </body>
            </html>
        `);
        global.document = dom.window.document;

        for (let i = 0; i < 10; i++) {
            addRoom();
        }

        const addButton = document.querySelector('button[onclick="addRoom()"]');
        expect(addButton.disabled).toBe(true);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
  });
  