import request from "supertest";
import app from "../app/app";
import { BASKET_URL} from "../app/shared.url";
import {StatusCodes} from "http-status-codes";
import fs from "fs";
import {ABANDONED_ITEMS_URL} from "../app/component/basket/basket.url";
import * as message from "../app/component/basket/basket.message";
import SharedHelper from "../app/shared-helper";

describe('Basket', () => {
    let productName = '';
    beforeAll(async () => {
        const content = fs.readFileSync('products.json', 'utf8') || '[]';
        const parsed = JSON.parse(content);
        productName = parsed[0].name
        const { body, status } = await request(app).post(
            `${BASKET_URL}`,
        ).send({name:productName});
        expect(body).toHaveProperty('status',true);
        expect(status).toEqual(StatusCodes.CREATED);

    });

    it('gets all items in basket', async () => {
        const { body, status } = await request(app).get(
            `${BASKET_URL}`,
        );
        expect(status).toEqual(StatusCodes.OK);
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('basket');
        expect(body).toHaveProperty('message');
        expect(body.status).toEqual(true);
    });
    it('does not add product that does not exist to basket', async () => {
        const { body, status } = await request(app).post(
            `${BASKET_URL}`,
        ).send({name:'Airpods Max'});
        expect(status).toEqual(StatusCodes.NOT_FOUND);
        expect(body).toHaveProperty('message', SharedHelper.titleCase(message.PRODUCT_DOES_NOT_EXIST));
        expect(body.status).toEqual(false);
    });
    it('does not delete a product if the product is not in the basket', async () => {
        const { body, status } = await request(app).delete(
            `${BASKET_URL}macbook-pro`,
        )
        expect(status).toEqual(StatusCodes.NOT_FOUND);
        expect(body).toHaveProperty('message', SharedHelper.titleCase(message.PRODUCT_NOT_IN_BASKET));
        expect(body.status).toEqual(false);
    });
    it('delete a product in the basket', async () => {
        const { body, status } = await request(app).delete(
            `${BASKET_URL}${productName}`,
        )
        expect(status).toEqual(StatusCodes.OK);
        expect(body).toHaveProperty('message', );
        expect(body.status).toEqual(true);
    });
    it('gets abandoned items in the basket', async () => {
        const { body, status } = await request(app).get(
            ABANDONED_ITEMS_URL,
        );
        expect(status).toEqual(StatusCodes.OK);
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('abandonedItems');
        expect(body).toHaveProperty('message');
        expect(body.status).toEqual(true);
    });

});
