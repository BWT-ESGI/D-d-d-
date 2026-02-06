import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Communities (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    let communityId: string;

    it('/communities (POST) - Create valid community', async () => {
        const response = await request(app.getHttpServer())
            .post('/communities')
            .send({
                name: 'E2E Community',
                description: 'Testing via Jest',
                isPrivate: true,
                creatorId: 'user-e2e',
            })
            .expect(201);

        expect(response.body.message).toBe('Community created successfully');
        expect(response.body.id).toBeDefined();
        communityId = response.body.id;
    });

    it('/communities/:id/join (POST) - Join valid community', async () => {
        // Must use same instance (which uses in-memory DB)
        // Note: In real E2E with DB reset, we'd need to recreate community first

        // Since 'beforeEach' resets the module (and thus the in-memory DB), 
        // we need to CREATE first in this test block too.
        const createRes = await request(app.getHttpServer())
            .post('/communities')
            .send({ name: 'Joinable E2E', isPrivate: false, creatorId: 'owner' })
            .expect(201);

        const targetId = createRes.body.id;

        return request(app.getHttpServer())
            .post(`/communities/${targetId}/join`)
            .send({
                userId: 'user-valid',
                userName: 'New Member',
                userEmail: 'member@test.com'
            })
            .expect(201)
            .expect((res) => {
                expect(res.body.message).toBe('Joined community successfully');
            });
    });

    it('/communities/:id/join (POST) - Fail with invalid user (Identity Guard)', async () => {
        // Generic Subdomain Guard Check
        return request(app.getHttpServer())
            .post(`/communities/any-id/join`)
            .send({
                userId: 'guest-invalid', // Doesn't start with user-
                userName: 'Hacker',
                userEmail: 'hacker@test.com'
            })
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toContain('Identity Subdomain check failed');
            });
    });
});
